import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { trainingReducer } from './training.reducer';


@NgModule({
    declarations: [
        TrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        CurrentTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer)
    ],
})
export class TrainingModule {

}