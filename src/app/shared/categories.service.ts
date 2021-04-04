import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../modules/category';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  listUrl: string = 'http://localhost:8080/categories/api/listCategories';
  categoriesUrl: string = 'http://localhost:8080/categories/api/listAll';
  createUrl: string = 'http://localhost:8080/categories/api/save';
  getUrl: string = 'http://localhost:8080/categories/api';
  updateUrl: string = 'http://localhost:8080/categories/api/update';
  deleteUrl: string = 'http://localhost:8080/categories/api/delete';

  constructor(private http: HttpClient) { }

  listCategories(page: number , size: number): Observable<any> {
    let params = new HttpParams();
    params = params.append("pageNumber" , String(page));
    params = params.append("pageSize" , String(size));
    return this.http.get(`${this.listUrl}` , {params}).pipe(
      map(categories => categories)
    );
  }

  getCategories():Observable<any> {
    return this.http.get(`${this.categoriesUrl}`);
  }

  filteringWithCategoryNameList(page: number , size: number , keyword: string) : Observable<any> {
    let params = new HttpParams();

    params = params.append("pageNumber" , String(page));
    params = params.append("pageSize" , String(size));
    params = params.append("categoryName" , keyword);

    return  this.http.get(`${this.listUrl}` , {params}).pipe(
      map(categories => categories)
    )
  }

  craete(category: FormData): Observable<any> {
    return this.http.post<Category>(`${this.createUrl}` , category);
  }

  getCategory(id: number): Observable<any> {
    return this.http.get<Category>(`${this.getUrl}/${id}`);
  }
  update(category: FormData , id: number): Observable<any> {
    return this.http.put<Category>(`${this.updateUrl}/${id}` , category);
  }

  delete(id: number): Observable<any> {
    return  this.http.get<Category>(`${this.deleteUrl}/${id}`);
  }

}
