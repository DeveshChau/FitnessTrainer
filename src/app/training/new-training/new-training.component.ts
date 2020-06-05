import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[] = [];
  exerciseSubscription: Subscription;
  constructor(private trainingServie: TrainingService, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.trainingServie.fetchAvailableExercise();
    this.exerciseSubscription = this.trainingServie.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );
  }

  onStartTraining(form: NgForm) {
    this.trainingServie.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

}
