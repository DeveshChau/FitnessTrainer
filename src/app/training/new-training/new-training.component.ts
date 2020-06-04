import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  exercises: Exercise[] = [];

  constructor(private trainingServie: TrainingService) { }

  ngOnInit(): void {
    this.exercises = this.trainingServie.getAvailableExercise();
  }

  onStart(form: NgForm) {
    this.trainingServie.startExercise(form.value.exercise);
  }

}
