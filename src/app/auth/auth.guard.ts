import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, Router, Route } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private router: Router, private store: Store<fromApp.State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromApp.getIsAuthenticated).pipe(take(1));
    }

    canLoad(route: Route) {
        return this.store.select(fromApp.getIsAuthenticated).pipe(take(1));
    }
}
