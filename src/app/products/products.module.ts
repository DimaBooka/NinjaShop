import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { CreateProductComponent } from "./components/create-product/create-product.component";
import { DetailProductComponent } from "./components/detail-product/detail-product.component";
import { RouterModule } from "@angular/router";
import { PRODUCTS_ROUTES } from "./products.routes";
import { LocalStorageModule } from "angular-2-local-storage";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailResolver } from './resolvers/product.resolver';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PRODUCTS_ROUTES),
    LocalStorageModule.withConfig({
      prefix: "products",
      storageType: "localStorage"
    }),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ProductsListComponent,
    CreateProductComponent,
    DetailProductComponent
  ],
  providers: [
    ProductDetailResolver
  ]
})
export class ProductsModule { }
