import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';

export interface State {
    ui: fromUi.State;
}

export const reducer: ActionReducerMap<State> = {
    ui: fromUi.uiReducer
};

// utility funtion to pull imformation from our state
//  'ui' => ui slice of our store

export const getUiState = createFeatureSelector<fromUi.State>('ui');

// getUIState => get the state from ui
// fromUi.getIsLoading => what to fetch from state returned by getUIState
// (here extract isLoading using getIsLoading utility function )
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
