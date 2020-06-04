import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    public authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router) { }

    generateUser(user: User) {
        this.user = {
            email: user.email,
            userId: user.userId
        };
        this.authChange.next(true);
        this.onAuthSuccess();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        this.authChange.next(true);
        this.onAuthSuccess();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }

    private onAuthSuccess() {
        this.router.navigate(['/training']);
    }
}
