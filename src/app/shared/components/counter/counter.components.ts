import { Component, Input} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { CounterService } from '../../services/counter.service';
import { CounterActions } from '../../../store/counter/counter-sync.actions';


@Component({
  selector: 'counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  private currentValue$: Observable<number>;

  constructor(
    counterService: CounterService,
    public actions: CounterActions
  ) {
    this.currentValue$ = counterService.getCurrentValue();
  }

}
