import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponceData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  logingMode: string;
  logingText: string;
  isLoading = false;
  error = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.logingMode = this.route.snapshot.routeConfig.path;
    console.log(this.logingMode);
    if (this.logingMode == "login") {
      this.logingText = "Вход";
    } else {
      this.logingText = "Авторизайция"
    }
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

      authObs.subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/mushrooms']);
      }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      });

      form.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
