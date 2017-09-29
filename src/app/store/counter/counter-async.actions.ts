import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {createAction} from '../createAction';
import {AppState} from '../../store-models/app.state.model';


@Injectable()
export class CounterActions {

  static INCREMENT = 'INCREMENT';
  static DECREMENT = 'DECREMENT';
  static RESET = 'RESET';

  constructor(private store: Store<AppState>) {}

  incrementIfOdd() {
    this.store.select(appState => appState.counter.currentValue)
      .take(1)
      .subscribe(currentValue => {
        if (currentValue % 2 !== 0) {
          this.store.dispatch(createAction(CounterActions.INCREMENT));
        }
      });
  }

  incrementAsync(timeInMs: number = 1000) {
    this.delay(timeInMs).then(() => this.store.dispatch(createAction(CounterActions.INCREMENT)));
  }

  private delay(timeInMs: number) {
    return new Promise((resolve) => {
      setTimeout(() => resolve() , timeInMs);
    });
  }
}
