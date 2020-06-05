import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {

    exerciseChanged: Subject<Exercise> = new Subject<Exercise>();
    exercisesChanged: Subject<Exercise[]> = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    exercises: Exercise[] = [];

    constructor(private db: AngularFirestore) { }

    fetchAvailableExercise() {
        this.db.collection('availableExercises')
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
        })).subscribe((exercises: Exercise[]) => {
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
        });
    }

    startExercise(selectedId: string): void {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise(): void {
        this.exercises.push({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number): void {
        this.exercises.push({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise(): Exercise {
        return ({ ...this.runningExercise });
    }

    getExersices(): Exercise[] {
        return this.exercises.slice();
    }
}
