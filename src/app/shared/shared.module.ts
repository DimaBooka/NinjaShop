import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FieldValidatorComponent } from './components/field-validator/field-validator.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FieldValidatorComponent
  ],
  exports: [
    HeaderComponent,
    FieldValidatorComponent
  ]
})
export class SharedModule { }
