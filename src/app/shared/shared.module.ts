import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimPipe } from './pipes/trim.pipe';



@NgModule({
  declarations: [
    TrimPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TrimPipe
  ]
})
export class SharedModule { }
