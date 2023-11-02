import { HttpClientModule } from '@angular/common/http';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from '../app.component';
import { ListOfProductsService } from './list-of-products-service';
import { ListOfProducts } from './list-of-products.component';
import {of} from 'rxjs';

describe('ListOfProductComponent', () => {
    let productService;
    beforeEach(() => TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule,
      MatToolbarModule,MatTableModule,MatPaginatorModule,MatIconModule,MatChipsModule,
      FormsModule,MatSlideToggleModule,MatSidenavModule,BrowserModule,MatSelectModule,
      MatInputModule],
      declarations: [AppComponent,ListOfProducts],
      providers:[provideAnimations(), HttpClientModule, HttpClientTestingModule,{provide: ListOfProductsService, useValue: productService}]
    }).compileComponents());
    beforeEach(()=>{
      
        productService = jasmine.createSpyObj('ListOfProductsService', ['getAllProductList']);
        let   listOfProductsService = TestBed.inject(ListOfProductsService) as jasmine.SpyObj<ListOfProductsService>;
        productService.getValue.and.returnValue(of(
            {      "1": {
            "gtin": 99014233738092,
            "product_name": "Dimethicone, Avobenzone, Octinoxate, Octocrylene",
            "product_desc": "Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.",
            "price": 90.18,
            "currency": "CNY",
            "category": "Nivea A Kiss of Recovery Medicated Lip Care",
            "gender": "",
            "quantity": 15,
            "size": "",
            "style": "architecture",
            "color": "Purple",
            "url": "http://fastcompany.com/ultrices/erat/tortor.js?a=condimentum&pede=id&posuere=luctus&nonummy=nec&integer=molestie&non=sed&velit=justo&donec=pellentesque&diam=viverra&neque=pede&vestibulum=ac&eget=diam&vulputate=cras&ut=pellentesque&ultrices=volutpat&vel=dui&augue=maecenas&vestibulum=tristique&ante=est&ipsum=et&primis=tempus&in=semper&faucibus=est&orci=quam&luctus=pharetra&et=magna&ultrices=ac&posuere=consequat&cubilia=metus&curae=sapien&donec=ut&pharetra=nunc",
            "image": "http://dummyimage.com/249x203.jpg/ff4444/ffffff",
            "image_additional": "http://dummyimage.com/157x160.jpg/ff4444/ffffff",
            "additional": "test",
            "source_video": "http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm"
          },
          "2": {
            "id": 2,
            "gtin": 99015164761593,
            "product_name": "PIOGLITAZONEHYDROCHLORIDE",
            "product_desc": "Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.",
            "price": 44.31,
            "currency": "CNY",
            "category": "PIOGLITAZONEHYDROCHLORIDE",
            "gender": "",
            "quantity": 3,
            "size": "",
            "style": "",
            "color": "Pink",
            "url": "https://flavors.me/ac/nibh/fusce/lacus.xml?nisi=ante&nam=vivamus&ultrices=tortor&libero=duis&non=mattis&mattis=egestas&pulvinar=metus&nulla=aenean&pede=fermentum&ullamcorper=donec&augue=ut&a=mauris&suscipit=eget&nulla=massa&elit=tempor&ac=convallis&nulla=nulla&sed=neque&vel=libero&enim=convallis&sit=eget&amet=eleifend&nunc=luctus&viverra=ultricies&dapibus=eu&nulla=nibh&suscipit=quisque&ligula=id&in=justo&lacus=sit",
            "image": "",
            "image_additional": "http://dummyimage.com/230x145.jpg/cc0000/ffffff",
            "additional": "ثم نفس سقطت وبالتحديد،, جزيرتي باستخدام أن دنو. إذ هنا؟ الستار وتنصيب كان. أهّل ايطاليا، بريطانيا-فرنسا قد أخذ. سليمان، إتفاقية بين ما, يذكر الحدود أي بعد, معاملة بولندا، الإطلاق عل إيو.",
            "source_video": "http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm"
          }}));
     
        spyOn(ListOfProducts.prototype,'getProductList').and.callThrough();
        spyOn(listOfProductsService, 'getAllProductList').and.callThrough();
        ListOfProducts.prototype.getProductList();
        spyOn(ListOfProducts.prototype, 'ngOnInit');
    });
 
  


  it('should create the component', () => {
    const fixture = TestBed.createComponent(ListOfProducts);
    const listOfProductsService = TestBed.inject(ListOfProductsService);  
    expect(listOfProductsService).toBeTruthy();
    console.log(productService);

    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.filterObjectList).toBe([]);
   expect(component.getProductList()).toHaveBeenCalled();
    expect(component.getFilterPredicate()).toHaveBeenCalled();
  });
});
