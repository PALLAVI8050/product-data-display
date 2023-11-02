import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ListOfProductsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  ;
  constructor(private http: HttpClient) {}

  public columnNameMap = new Map();
  public operatorMap = new Map();
  private getProductListUrl = 'api/productList';

  /**
   *
   * @returns Obeservable
   * gets list of products as a http response
   */
  getAllProductList(): Observable<any> {
    return this.http.get<any[]>(this.getProductListUrl);
  }

  /**
   *
   * throws error when there is an error in fetching data.
   */
  handleError<T>(error: any): any {
    throw new Error('Method not implemented.');
  }

  /**
   *
   * @returns Map
   *  maps column names to its value in DB and type of column
   */
  public setcolumnMapValues(): Map<any, any> {
    this.columnNameMap.set('ID', { value: 'id', type: 'number' });
    this.columnNameMap.set('GTIN', { value: 'gtin', type: 'number' });
    this.columnNameMap.set('Name', { value: 'product_name', type: 'string' });
    this.columnNameMap.set('Description', {
      value: 'product_desc',
      type: 'string',
    });
    this.columnNameMap.set('Price', { value: 'price', type: 'number' });
    this.columnNameMap.set('Currency', { value: 'currency', type: 'string' });
    this.columnNameMap.set('Category', { value: 'category', type: 'string' });
    this.columnNameMap.set('Gender', { value: 'gender', type: 'string' });
    this.columnNameMap.set('Quantity', { value: 'quantity', type: 'number' });
    this.columnNameMap.set('Size', { value: 'size', type: 'string' });
    this.columnNameMap.set('Style', { value: 'style', type: 'string' });
    this.columnNameMap.set('Color', { value: 'color', type: 'string' });
    this.columnNameMap.set('URL', { value: 'url', type: 'string' });
    this.columnNameMap.set('Image', { value: 'image', type: 'string' });
    this.columnNameMap.set('Image additional', {
      value: 'image_additional',
      type: 'string',
    });
    this.columnNameMap.set('Additional', {
      value: 'additional',
      type: 'string',
    });
    this.columnNameMap.set('SourceVideo', {
      value: 'sourceVideo',
      type: 'string',
    });
    return this.columnNameMap;
  }
  /**
   *
   * @returns new Map
   * maps the operator to types it can be used for filtering
   */
  mapOperatorValues() {
    this.operatorMap.set('contains', 'string');
    this.operatorMap.set('starts with', 'string');
    this.operatorMap.set('ends with', 'string');
    this.operatorMap.set('equals', '*');
    this.operatorMap.set('less than', 'number');
    this.operatorMap.set('grater than', 'number');

    return this.operatorMap;
  }
}
