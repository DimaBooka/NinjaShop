import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store/root.reducer';
import { CounterActions } from "./store/counter/counter-sync.actions";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(rootReducer),
    SharedModule
  ],
  providers: [ CounterActions ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
