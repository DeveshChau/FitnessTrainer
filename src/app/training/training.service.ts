import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import * as UI from '../shared/ui.actions';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TrainingService {

    fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiSerive: UIService,
        private store: Store<fromTraining.State>
    ) { }

    fetchAvailableExercise() {
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(this.db.collection('availableExercises')
            .snapshotChanges()
            .pipe(map(docArray => {
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        // tslint:disable-next-line: no-string-literal
                        name: doc.payload.doc.data()['name'],
                        // tslint:disable-next-line: no-string-literal
                        duration: doc.payload.doc.data()['duration'],
                        // tslint:disable-next-line: no-string-literal
                        calories: doc.payload.doc.data()['calories'],
                    };
                });
            }))
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new UI.StopLoading());
                this.store.dispatch(new Training.SetAvailableExercise(exercises));
            }, (error) => {
                this.store.dispatch(new UI.StopLoading());
                this.uiSerive.showSnackBar('Fetching exercise failed, please try again', null, 3000);
            }));
    }

    startExercise(selectedId: string): void {
        this.store.dispatch(new Training.StartExercise(selectedId));
    }

    completeExercise(): void {
        this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe((ex) => {
            this.addDataToDatabase({
                ...ex,
                date: new Date(),
                state: 'Completed'
            });
        });
        this.store.dispatch(new Training.StopExercise());
    }

    cancelExercise(progress: number): void {
        this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex,
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                date: new Date(),
                state: 'Cancelled'
            });
            this.store.dispatch(new Training.StopExercise());
        });
    }

    fetchFinishedExersices() {
        this.fbSubs.push(
            this.db
                .collection('finishedExercise')
                .valueChanges()
                .subscribe((res: Exercise[]) => {
                    this.store.dispatch(new Training.SetFinishedExercise(res));
                })
        );
    }

    cancelSubscription() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercise').add(exercise);
    }
}
