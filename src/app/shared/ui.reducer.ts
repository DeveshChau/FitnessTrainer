import { UIActions, START_LOADING, STOP_LOADING } from './ui.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
    isLoading: false
};

export function uiReducer(state = initialState, action: UIActions) {
    switch (action.type) {
        case START_LOADING:
            return {
                isLoading: true
            };
            break;
        case STOP_LOADING:
            return {
                isLoading: false
            };
            break;
        default:
            return state;
            break;
    }
}

// utility funtion to give back isLoading from state.
export const getIsLoading = (state: State) => state.isLoading;
