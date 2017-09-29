import { Product } from '../products/product.model';

// export interface AppState {
//   productsList: Product[],
//   createProduct: Product
// }

import {Counter} from './counter.model';

export interface AppState {
  readonly counter: Counter;
}
