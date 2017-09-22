import { Routes } from "@angular/router";

export const ROUTES: Routes = [
  {path: "products", loadChildren: "./products/products.module#ProductsModule"},
  {path: "", redirectTo: "products", pathMatch: "full"},
  // {path: "**", redirectTo: "products", pathMatch: "full"}
];
