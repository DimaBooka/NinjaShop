import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageModule } from "angular-2-local-storage/dist";
import { SharedModule } from "../../../shared/shared.module";
import { Product } from '../../product.model';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        LocalStorageModule.withConfig({
          prefix: "products",
          storageType: "localStorage"
        }),
        SharedModule
      ],
      declarations: [ CreateProductComponent ],
      providers: [ { provide: Router, useValue: mockRouter } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.ngOnInit();
    expect(component._creationProduct.valid).toBeFalsy();
  });

  it('field title should be required', () => {
    component.ngOnInit();

    let errors = {};
    let title = component._creationProduct.controls['title'];
    errors = title.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('field title should be invalid when title length more 30 characters', () => {
    component.ngOnInit();

    let errors = {};
    let title = component._creationProduct.controls['title'];
    title.setValue("super long title, super long title");
    errors = title.errors || {};
    expect(errors['MaxLength']).toBeTruthy();
  });

  it('form should be valid', () => {
    component.ngOnInit();

    component._creationProduct.controls['title'].setValue("super title");
    component._creationProduct.controls['description'].setValue("super description, super description");
    component._creationProduct.controls['price'].setValue(123);

    expect(component._creationProduct.valid).toBeTruthy();
  });

  it('submit form should create product', () => {
    spyOn(component._localStorageService, 'set').and.returnValue(true);
    spyOn(component._localStorageService, 'get').and.returnValue(null);
    component.ngOnInit();

    let title = component._creationProduct.controls['title'];
    title.setValue("super title");
    let description = component._creationProduct.controls['description'];
    description.setValue("super description, super description");
    let image = component.image = "data base64 of image";
    let price = component._creationProduct.controls['price'];
    price.setValue(123);

    component.createProduct();

    let product = new Product(
      title.value,
      description.value,
      image,
      price.value
    );

    expect(component._localStorageService.set).toHaveBeenCalledWith('products', [product]);
  });
});
