import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiginComponent } from './singin/singin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SiginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
