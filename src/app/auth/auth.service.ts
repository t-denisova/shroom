import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

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
    user = new BehaviorSubject<User>(null);
    token: string = null;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponceData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCANsM6DqsE-hWNhH8v0AwNmjIsX1QpidM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
               this.handleAuthentication(
                   resData.email,
                   resData.localId,
                   resData.idToken,
                   +resData.expriresIn
                );
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponceData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCANsM6DqsE-hWNhH8v0AwNmjIsX1QpidM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expriresIn
                );
            })
        );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/login']);
    }

    private handleAuthentication(email: string, userId: string, token: string, expriresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expriresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'Неизвестная ошибка';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Такой электронный адрес уже существует';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Такой электронный адрес не существует';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Неправильный пароль';
                break;
          }
          return throwError(errorMessage);
    }
}