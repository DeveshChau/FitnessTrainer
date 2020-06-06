import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  // isLoading = true;
  isLoading$: Observable<boolean>;
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  constructor(
    private trainingServie: TrainingService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingServie.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingServie.fetchAvailableExercise();
  }
  onStartTraining(form: NgForm) {
    this.trainingServie.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

}
