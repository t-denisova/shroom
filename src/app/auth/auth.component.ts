import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponceData } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  logingMode: string;
  isLoading = false;
  error = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.logingMode = this.route.snapshot.routeConfig.path;
  }

  onSubmit(form: NgForm) {
      if (!form.valid) {
          return;
      }
      const email = form.value.email;
      const password = form.value.password;

      let authObs: Observable<AuthResponceData>;

      this.isLoading = true;
      if (this.logingMode == "login") {
        authObs = this.authService.login(email, password);
      } else {
        authObs = this.authService.signup(email, password);
      }

      authObs.subscribe(responceData => {
        console.log(responceData);
        this.isLoading = false;
      }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      });

      form.reset();
  }
}