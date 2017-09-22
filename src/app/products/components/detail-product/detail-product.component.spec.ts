import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductComponent } from './detail-product.component';
import { LocalStorageModule } from "angular-2-local-storage/dist";
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Product } from '../../product.model';

describe('DetailProductComponent', () => {
  let component: DetailProductComponent;
  let fixture: ComponentFixture<DetailProductComponent>;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  let mockActivatedRoute = {
    data: {
      subscribe: () => {
        return {
          product: new Product("product one", "descr one", "image one", 1)
        }
      }
    }
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
        NgbModule.forRoot(),
        SharedModule
      ],
      declarations: [ DetailProductComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProductComponent);
    component = fixture.componentInstance;
    component._product = new Product("product one", "descr one", "image one", 1);
    component.index = 0;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render product with title product one', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".card-title").innerText).toEqual("product one");
  });

  it('should update product', () => {
    spyOn(component._localStorageService, 'get').and.returnValue([
      new Product("product one", "descr one", "image one", 1),
      new Product("product two", "descr two", "image two", 2)
    ]);
    spyOn(component._localStorageService, 'set');
    component.ngOnInit();

    let title = component._editProduct.controls['title'];
    title.setValue("super title");

    component.updateProduct();

    expect(component._localStorageService.set).toHaveBeenCalledWith("products", [
      new Product("super title", "descr one", "image one", 1),
      new Product("product two", "descr two", "image two", 2)
    ]);
  });

  it('should remove product on delete', () => {
    spyOn(component._localStorageService, 'get').and.returnValue([
      new Product("product one", "descr one", "image one", 1),
      new Product("product two", "descr two", "image two", 2)
    ]);
    spyOn(component._localStorageService, 'set');

    component.deleteProduct();

    expect(component._localStorageService.set).toHaveBeenCalledWith("products", [
      new Product("product two", "descr two", "image two", 2)
    ]);
  });

});
