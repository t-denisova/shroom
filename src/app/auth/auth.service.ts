import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponceData {
    idToken: string;
    email: string;
    refreshToken: string;
    expriresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCANsM6DqsE-hWNhH8v0AwNmjIsX1QpidM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorRes => {
            let errorMessage = 'Неизвестная ошибка';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch (errorRes.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'Такой электронный адрес уже существует'
              }
              return throwError(errorMessage);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCANsM6DqsE-hWNhH8v0AwNmjIsX1QpidM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        );
    }
}