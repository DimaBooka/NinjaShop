import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from '../../product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../../../shared/validators-messages';
import { LocalStorageService } from 'angular-2-local-storage';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MaxLengthValidator } from '../../../shared/validators';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  private product: Product;
  private editMode: boolean = false;
  private editProduct: FormGroup;
  public validationMessagesObject = validationMessages;
  public image: string;
  public index: number;
  private errorImage: boolean = false;

  /* For unit tests */
  get _route() { return this.route };
  get _product() { return this.product };
  get _localStorageService() { return this.localStorageService };
  get _editProduct() { return this.editProduct };
  set _product(product: Product) { this.product = product };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private modalService: NgbModal
  ) {
    this.route.data.subscribe(product => {
      this.product = <Product>product.product;
      this.index = +this.route.params["value"]["id"] - 1;
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.editProduct = this.fb.group({
      title: [this.product.title, [Validators.required, MaxLengthValidator(30)]],
      description: [this.product.description, [Validators.required, MaxLengthValidator(250)]],
      image: [''],
      price: [this.product.price, [Validators.required]]
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

  editModeToggle() {
    this.editMode = !this.editMode;
    if (!this.editMode)
      this.initForm();
  }

  openDeletePopup(popup) {
    this.modalService.open(popup).result.then(
      (result) => {
        this.deleteProduct();
      },
      (reason) => {}
    );
  }

  deleteProduct() {
    let products = <Product[]>this.localStorageService.get("products");
    products.splice(this.index, 1);
    this.localStorageService.set("products", products);

    this.router.navigate(["products"]);
  }

  updateProduct() {
    let product = new Product(
      this.editProduct.get("title").value,
      this.editProduct.get("description").value,
      this.image ? this.image : this.product.image,
      this.editProduct.get("price").value
    );

    let products = <Product[]>this.localStorageService.get("products");
    products[this.index] = product;
    this.localStorageService.set("products", products);

    this.product = product;
    this.editModeToggle();
  }
}
