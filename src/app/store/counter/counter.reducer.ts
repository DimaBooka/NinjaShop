import { ActionWithPayload } from '../../store-models/action.model';
import { CounterActions } from './counter-sync.actions';
import { Counter, setCounterCurrentValue } from '../../store-models/counter.model';

export function counterReducer(
  counter: Counter = { currentValue: 0 },
  action: ActionWithPayload
): Counter {
  switch (action.type) {
    case CounterActions.INCREMENT:
      return setCounterCurrentValue(counter, counter.currentValue + 1);

    case CounterActions.DECREMENT:
      return setCounterCurrentValue(counter, counter.currentValue - 1);

    case CounterActions.RESET:
      return setCounterCurrentValue(counter, 0);

    default:
      return counter;
  }
}
