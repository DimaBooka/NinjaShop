import { Component, OnInit } from "@angular/core";
import { Product } from "../../product.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { validationMessages } from "../../../shared/validators-messages";
import { LocalStorageService } from "angular-2-local-storage";
import { MaxLengthValidator } from '../../../shared/validators';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  private creationProduct: FormGroup;
  public validationMessagesObject = validationMessages;
  public image: string;
  private errorImage: boolean = false;

  /* For unit tests */
  get _creationProduct() { return this.creationProduct };
  get _localStorageService() { return this.localStorageService };

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.creationProduct = this.fb.group({
      title: ['', [Validators.required, MaxLengthValidator(30)]],
      description: ['', [Validators.required, MaxLengthValidator(250)]],
      image: [''],
      price: ['', [Validators.required]]
    });
  }

  private fileToBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  public addImage(event) {
    this.errorImage = false;
    let target = event.target || event.srcElement;
    if (target.files[0] && target.files[0].size / 1024 / 1024 > 2)
      this.errorImage = true;
    else if (target.files && target.files.length > 0)
      this.fileToBase64(target.files[0]);
  }

  createProduct() {

    let product = new Product(
      this.creationProduct.get("title").value,
      this.creationProduct.get("description").value,
      this.image,
      this.creationProduct.get("price").value
    );

    let products = <Product[]>this.localStorageService.get("products");
    if (products && products.length === 0 || !products)
      this.localStorageService.set("products", [product]);
    else {
      products.push(product);
      this.localStorageService.set("products", products);
    }

    this._router.navigate(["products"]);
  }
}
