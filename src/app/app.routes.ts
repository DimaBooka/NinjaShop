import { Routes } from "@angular/router";
import { CounterComponent } from './shared/components/counter/counter.components';

export const ROUTES: Routes = [
  {path: "counter", component: CounterComponent},
  {path: "products", loadChildren: "./products/products.module#ProductsModule"},
  {path: "", redirectTo: "products", pathMatch: "full"},
  // {path: "**", redirectTo: "products", pathMatch: "full"}
];
