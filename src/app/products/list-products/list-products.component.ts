import { Component, OnInit } from '@angular/core';
import {ProductPaging} from '../../modules/productPaging';
import {Product} from '../../modules/product';
import {ProductService} from '../../shared/product.service';
import {map} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  dataSource: ProductPaging;
  promotionColumns: string[] = ['image' , 'productName' , 'brand' , 'generation' , 'action'];
  products: Product[] = [];
  listProducts: Product[] = [];
  pageEvent: PageEvent;
  totalElements: number;
  filteringValue: string;
  size: number;
  constructor(private productService: ProductService , private router: Router) { }

  ngOnInit(): void {
    this.productService.listProducts(0 , 6).pipe(
      map((productData: ProductPaging) =>{
        console.log(productData);
        this.dataSource = productData;
        this.products = productData.content;
        this.totalElements = productData.totalElements;
        this.size = productData.size;
      })
    ).subscribe()

    this.productService.getList().subscribe(
      (products) => {
        this.listProducts = products;
      }
    )
  }

  onPaginateChange(event : PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    console.log(page);
    console.log(size);
    if(this.filteringValue == undefined) {
      this.productService.listProducts(page , size).pipe(
        map((productData: ProductPaging) => {
          this.dataSource = productData;
          this.products = this.dataSource.content;
        })
      ).subscribe();
    }
    else {
      this.productService.listProductsWithPagination(page , size , this.filteringValue).pipe(
        map((productPaging: ProductPaging) => {
          this.dataSource = productPaging;
          this.products = productPaging.content;
        })
      );
    }
  }

  onFilteringValue(keyword: string) {
    this.productService.listProductsWithPagination(0 , 6 , keyword).pipe(
      map((productData: ProductPaging) => {
        this.dataSource = productData;
        this.products = this.dataSource.content;
      })
    ).subscribe();
  }

  onCreateProduct() {
    this.router.navigate(['admin/createProduct'])
  }

  onDetailProduct(categoryId: number , promotionId: number , id: number) {
    this.router.navigate([ 'admin/detailProduct' , categoryId , promotionId , id]);
  }

}
