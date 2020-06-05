import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {

    public authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(
        private router: Router,
        private auth: AngularFireAuth,
        private trainingService: TrainingService) { }

    initAuthListner() {
        this.auth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }
            else {
                this.trainingService.cancelSubscription();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        });
    }
    generateUser(user: AuthData) {
        this.auth.createUserWithEmailAndPassword(user.email, user.password)
            .catch(error => {
                console.log(error);
            });
    }

    login(authData: AuthData) {
        this.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .catch(error => {
                console.log(error);
            });
    }

    logout() {
        this.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}
