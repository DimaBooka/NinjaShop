import { Routes } from "@angular/router";
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { ProductDetailResolver } from './resolvers/product.resolver';

export const PRODUCTS_ROUTES: Routes = [
  {path: "", component: ProductsListComponent},
  {path: "create", component: CreateProductComponent},
  {path: ":id", component: DetailProductComponent, resolve: { product: ProductDetailResolver }},
  // {path: "**", redirectTo: "products", pathMatch: "full"}
];
