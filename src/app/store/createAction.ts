import { ActionWithPayload } from '../store-models/action.model';

export function createAction(type, payload?): ActionWithPayload {
  return { type, payload };
}
