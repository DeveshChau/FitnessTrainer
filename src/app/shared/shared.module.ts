import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';

import { MaterialModule } from '../material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexModule
    ]
})
export class SharedModule {
}
