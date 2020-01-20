import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogingMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLogingMode = !this.isLogingMode;
}

  onSubmit(form: NgForm) {
      if (!form.valid) {
          return;
      }
      const email = form.value.email;
      const password = form.value.password;

      this.isLoading = true;
      if (this.isLogingMode) {

      } else {
        this.authService.signup(email, password).subscribe(responceData => {
          console.log(responceData);
          this.isLoading = false;
        }, errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        });
      }
      form.reset();
  }
}
