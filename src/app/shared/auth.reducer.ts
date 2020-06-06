import { AuthActions } from './auth.actioins';
import { SET_AUTHENTICATION, REMOVE_AUTHENTICATION } from './auth.actioins';

export interface State {
    isAuthenticated: boolean;
}

export const initialState: State = {
    isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATION:
            return {
                isAuthenticated: true
            };
            break;
        case REMOVE_AUTHENTICATION:
            return {
                isAuthenticated: false
            }
        default:
            return state;
            break;
    }
}

export const getisAuthenticated = (state: State) => (state.isAuthenticated);
