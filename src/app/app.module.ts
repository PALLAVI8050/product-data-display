import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListOfProducts } from './list-of-products/list-of-products.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductsListDataService } from './products-list-data.service';
import { ListOfProductsService } from './list-of-products/list-of-products-service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [AppComponent, ListOfProducts],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductsListDataService, {
      dataEncapsulation: false,
      apiBase: 'api/',
    }),
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatChipsModule,
  ],
  exports: [
    ListOfProducts,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatChipsModule,
  ],
  providers: [ListOfProductsService, provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
