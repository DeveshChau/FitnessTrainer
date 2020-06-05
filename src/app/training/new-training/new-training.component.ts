import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  isLoading = true;
  loaderSub: Subscription;
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  constructor(private trainingServie: TrainingService, private db: AngularFirestore, private uiService: UIService) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingServie.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      }
    );
    this.loaderSub = this.uiService.isLoaderChanged.subscribe(
      res => {
        this.isLoading = res;
      }
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingServie.fetchAvailableExercise();
  }
  onStartTraining(form: NgForm) {
    this.trainingServie.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
    this.loaderSub.unsubscribe();
  }

}
