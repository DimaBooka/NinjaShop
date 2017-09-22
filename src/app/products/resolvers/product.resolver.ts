import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import { Product } from '../product.model';


@Injectable()
export class ProductDetailResolver implements Resolve<Product> {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any  {
    let id: number = route.params.id;
    let productObject = new Product();
    let products = <Product[]>this.localStorageService.get("products");
    if (products.length >= id - 1) {
      productObject.createByLS(products[id - 1]);
      return productObject;
    } else {
      this.router.navigate(["products"]);
    }
  }
}
