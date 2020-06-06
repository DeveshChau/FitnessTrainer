import { Action } from '@ngrx/store';

export const SET_AUTHENTICATION = '[Auth] Set Authentication';
export const REMOVE_AUTHENTICATION = '[Auth] Remove Authentication';

export class SetAuthentication implements Action {
    readonly type = SET_AUTHENTICATION;
}

export class RemoveAuthentication implements Action {
    readonly type = REMOVE_AUTHENTICATION;
}

export type AuthActions = SetAuthentication | RemoveAuthentication;
