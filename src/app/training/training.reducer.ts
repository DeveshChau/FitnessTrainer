import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';
import {
    TrainingActions,
    SET_AVAILABLE_EXERCISE,
    SET_FINISHED_EXERCISE,
    START_EXERCISE,
    STOP_EXERCISE
} from './training.actions';

export interface TrainingState {
    availableExercise: Exercise[];
    finishedExercise: Exercise[];
    activeExercise: Exercise;
}

export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState: TrainingState = {
    availableExercise: [],
    finishedExercise: [],
    activeExercise: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_EXERCISE:
            return {
                ...state,
                availableExercise: action.payload
            };
            break;
        case SET_FINISHED_EXERCISE:
            return {
                ...state,
                finishedExercise: action.payload
            };
            break;
        case START_EXERCISE:
            return {
                ...state,
                activeExercise: { ...state.availableExercise.find(ex => ex.id === action.payload) }
            };
            break;
        case STOP_EXERCISE:
            return {
                ...state,
                activeExercise: null
            };
            break;
        default:
            return state;
            break;
    }
}

// string 'training' is associated with training in the state - StoreModule.forFeature('training', trainingReducer) 
export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercise = createSelector(getTrainingState, (state: TrainingState) => state.availableExercise);
export const getFinishedExercise = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercise);
export const getActiveExercise = createSelector(getTrainingState, (state: TrainingState) => state.activeExercise);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeExercise != null);
