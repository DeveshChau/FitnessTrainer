import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  ongoingTraing = false;
  eserciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.exerciseChanged.subscribe(
      exercise => {
        exercise ? this.ongoingTraing = true : this.ongoingTraing = false;
      }
    );
  }

}
