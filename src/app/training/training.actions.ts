import { Action } from '@ngrx/store';

import { Exercise } from './exercise.model';

export const SET_AVAILABLE_EXERCISE = '[Training] Set available Exercise';
export const SET_FINISHED_EXERCISE = '[Training] Set finished Exercise';
export const START_EXERCISE = '[Training] Start Exercise';
export const STOP_EXERCISE = '[Training] Stop Exercise';

export class SetAvailableExercise implements Action {
    readonly type = SET_AVAILABLE_EXERCISE;

    constructor(public payload: Exercise[]) { }
}

export class SetFinishedExercise implements Action {
    readonly type = SET_FINISHED_EXERCISE;
    constructor(public payload: Exercise[]) { }
}

export class StartExercise implements Action {
    readonly type = START_EXERCISE;
    constructor(public payload: string) { }
}

export class StopExercise implements Action {
    readonly type = STOP_EXERCISE;
}

export type TrainingActions =  SetAvailableExercise | SetFinishedExercise | StartExercise | StopExercise;
