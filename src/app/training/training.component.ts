import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining$: Observable<boolean>;
  eserciseSubscription: Subscription;
  constructor(private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
  }

  ngOnDestroy() {
    if (this.eserciseSubscription) {
      this.eserciseSubscription.unsubscribe();
    }
  }

}
