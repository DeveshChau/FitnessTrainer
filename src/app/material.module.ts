import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const materialModule = [
    MatButtonModule,
    MatIconModule
];
@NgModule({
  imports: [materialModule],
  exports: [materialModule]
})
export class MaterialModule { }
