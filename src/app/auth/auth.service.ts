import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {

    public authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(
        private router: Router,
        private auth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) { }

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
        // this.uiService.isLoaderChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.auth.createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                this.store.dispatch(new UI.StopLoading());
                // this.uiService.isLoaderChanged.next(false);
            })
            .catch(error => {
                this.store.dispatch(new UI.StopLoading());
                // this.uiService.isLoaderChanged.next(false);
                this.uiService.showSnackBar(error.message, null, 3000);
            });
    }

    login(authData: AuthData) {
        // this.uiService.isLoaderChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(res => {
                this.store.dispatch(new UI.StopLoading());
                // this.uiService.isLoaderChanged.next(false);
            })
            .catch(error => {
                this.store.dispatch(new UI.StopLoading());
                // this.uiService.isLoaderChanged.next(false);
                this.uiService.showSnackBar(error.message, null, 3000);
            });
    }

    logout() {
        this.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}
