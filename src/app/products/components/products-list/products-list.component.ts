import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { Product } from '../../product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  private products: Product[] = [];

  /* For unit tests */
  get _localStorageService() { return this.localStorageService };

  constructor(
    private _router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    let products = <any[]>this.localStorageService.get("products");
    this.products = products.map(product => {
      let productObject = new Product();
      productObject.createByLS(product);
      return productObject;
    });
  }

  moveToDetail(index) {
    this._router.navigate(["products", index]);
  }
}
