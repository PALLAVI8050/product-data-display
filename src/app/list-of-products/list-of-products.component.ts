import {
  Component,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { ListOfProductsService } from './list-of-products-service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { FilterObject } from '../Model/filterModel';
import { Product } from '../Model/productModel';

@Component({
  selector: 'list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.scss']
})
export class ListOfProducts {
  constructor(
    private listOfProductsService: ListOfProductsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public productList = [];
  public displayedColumns: string[] = [];
  public opened: boolean;
  public operators = [];
  public filterObject = new FilterObject();
  public filterObjectList = [];
  public columnNameMap = new Map<any, any>();
  public operatorMap = new Map<any, any>();

  public dataSource = new MatTableDataSource<Product>(this.productList);
  public dataSourceWithPageSize = new MatTableDataSource<Product>(
    this.productList
  );

  ngOnInit() {
    this.filterObjectList = [];
    this.columnNameMap = this.listOfProductsService.setcolumnMapValues();
    this.operatorMap = this.listOfProductsService.mapOperatorValues();
    this.operators = Array.from(this.operatorMap.keys());
    this.getProductList();
    this.dataSource.filterPredicate = this.getFilterPredicate();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * @returns void
   * subscribes to http changes and handles data load and pagination initilization
   *
   */
  public getProductList(): any {
    this.listOfProductsService
      .getAllProductList()
      .subscribe((data: Observable<any>[]) => {
        this.productList = Object.values(data);
        this.dataSource = new MatTableDataSource<Product>(this.productList);
        this.dataSource.paginator = this.paginator;
        this.handlePageEvent(this.paginator);
        this.changeDetectorRef.detectChanges();
      });
    this.displayedColumns = Array.from(this.columnNameMap.keys());
  }

  /**
   *
   * @param event
   * handles page change events
   */
  handlePageEvent(event) {
    this.dataSource.data = this.productList;
    this.changeDetectorRef.detectChanges();
  }
  /**
   * filters the product list after applying filter
   */
  filterProductList() {
    if (
      this.filterObject.column &&
      this.filterObject.operator &&
      this.filterObject.value
    ) {
      this.filterObjectList.push(this.filterObject);
     
    }
    this.dataSource.filter = JSON.stringify(this.filterObjectList);
    this.dataSource.filterPredicate = this.getFilterPredicate();

    this.handlePageEvent(this.paginator);
    this.changeDetectorRef.detectChanges();
    this.filterObject = new FilterObject();
    this.operators = Array.from(this.operatorMap.keys());
  
  }

  /**
   *
   * @returns predicate object
   * handles required filter operations
   */

  getFilterPredicate() {
    return (data: Product, filters: string) => {
      let filterValue = JSON.parse(filters);
      let matchFilter = true;
      filterValue.forEach((filter) => {
        let colName = data[this.columnNameMap.get(filter.column).value]
          .toString()
          .toLowerCase();
        switch (filter.operator) {
          case 'contains': {
            matchFilter =
              matchFilter &&
              colName.toLowerCase().includes(filter.value.toLowerCase());
            break;
          }
          case 'starts with': {
            matchFilter =
              matchFilter && colName.startsWith(filter.value.toLowerCase());
            break;
          }
          case 'ends with': {
            matchFilter =
              matchFilter && colName.endsWith(filter.value.toLowerCase());
            break;
          }
          case 'less than': {
            matchFilter = matchFilter && Number(colName) < Number(filter.value);
            break;
          }
          case 'grater than': {
            matchFilter = matchFilter && Number(colName) > Number(filter.value);
            break;
          }
          case 'equals': {
            matchFilter = matchFilter && colName == filter.value;
            break;
          }
        }
      });
      return matchFilter;
    };
  }

  /**
   *
   * @param filter
   * handles changes required for removing specific filter
   */
  removeFilter(filter) {
    let index = this.filterObjectList.indexOf(filter);
    if (index > -1) {
      this.filterObjectList.splice(index, 1);
      this.filterProductList();
    }
  }

  /**
   *
   * @param selectedColumn
   * filter the operators based on type of column values
   */
  filterOperators(selectedColumn) {
    this.operators = Array.from(this.operatorMap.keys());
    let typeOfSelectedColumn = this.columnNameMap.get(selectedColumn).type;
    this.operators = this.operators.filter((operator) => {
      return (
        this.operatorMap.get(operator) == typeOfSelectedColumn ||
        this.operatorMap.get(operator) == '*'
      );
    });
  }
}
