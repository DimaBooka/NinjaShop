import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FieldValidatorComponent } from './components/field-validator/field-validator.component';
import { RouterModule } from '@angular/router';
import { CounterService } from './services/counter.service';
import { CounterComponent } from "./components/counter/counter.components";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FieldValidatorComponent,
    CounterComponent
  ],
  exports: [
    HeaderComponent,
    FieldValidatorComponent,
    CounterComponent
  ],
  providers: [
    CounterService
  ]
})
export class SharedModule { }
