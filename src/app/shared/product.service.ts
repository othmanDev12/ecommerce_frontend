import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../modules/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  listProductsUrl: string = 'http://localhost:8080/api/product/allProducts';
  listProduct: string = 'http://localhost:8080/api/product';
  createProductUrl: string = 'http://localhost:8080/api/product'
  getProductUrl: string = 'http://localhost:8080/api/product'
  updateProductUrl: string = 'http://localhost:8080/api/product';
  products: string = 'http://localhost:8080/api/product/products';
  deleteProductUrl: string = 'http://localhost:8080/api/product/delete';

  constructor(private http: HttpClient) { }

  listProducts(page: number , size: number): Observable<any> {
    let params = new HttpParams();
    params = params.append("pageNumber" , String(page));
    params = params.append("pageSize" , String(size));
    return this.http.get(`${this.listProductsUrl}` , {params}).pipe(
      map(products => products)
    );
  }

  listProductsWithPagination(page: number , size: number , keyword: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("pageNumber" , String(page));
    params = params.append("pageSize" , String(size));
    params = params.append("productName" , keyword);
    return this.http.get(`${this.listProductsUrl}` , {params}).pipe(
      map(products => products)
    );
  }

  getProducts(categoryId: number , promotionId: number): Observable<any> {
    return this.http.get(`${this.listProduct}/${categoryId}/${promotionId}/listProducts`);
  }

  getList(): Observable<any> {
    return  this.http.get(`${this.products}`)
  }

  createProduct( categoryId: number , promotionId : number , product: FormData): Observable<any> {
    return this.http.post<Product>(`${this.createProductUrl}/${categoryId}/${promotionId}/save` , product );
  }

  getProduct(id: number , categoryId: number , promotionId: number): Observable<any> {
    return this.http.get(`${this.getProductUrl}/${categoryId}/${promotionId}/product/${id}`);
  }

  updateProduct(categoryId: number ,
                promotionId: number , id: number , product: FormData): Observable<any> {
    return this.http.put(`${this.updateProductUrl}/${categoryId}/${promotionId}/update/${id}` , product);
  }

  deleteProducts(productId: number): Observable<any> {
    return this.http.delete(`${this.deleteProductUrl}/${productId}`);
  }

}
