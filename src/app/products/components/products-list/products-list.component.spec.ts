import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageModule } from "angular-2-local-storage/dist";
import { Product } from '../../product.model';
import { SharedModule } from "../../../shared/shared.module";

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        LocalStorageModule.withConfig({
          prefix: "products",
          storageType: "localStorage"
        })
      ],
      declarations: [ ProductsListComponent ],
      providers: [ { provide: Router, useValue: mockRouter } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    spyOn(component._localStorageService, 'get').and.returnValue([
      new Product("product one", "descr one", "image one", 1),
      new Product("product two", "descr two", "image two", 2)
    ]);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('first rendered product should has title product one, and not product two', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".card-title").innerText).toEqual("product one");
    expect(compiled.querySelector(".card-title").innerText).not.toEqual("product two");
  });
});
