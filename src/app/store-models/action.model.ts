import { Action } from '@ngrx/store';

export interface ActionWithPayload extends Action {
  type: string,
  payload: any
}
