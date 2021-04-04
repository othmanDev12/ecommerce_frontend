import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../modules/category';
import {CategoriesService} from '../../shared/categories.service';
import {Router} from '@angular/router';
import {CategoryPaging} from '../../modules/categoryPaging';
import {map} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

   categories: Category[] = [];
   dataSource: CategoryPaging;
   categoryColums: string[] = ["categoryName" , "action"];
   totalElements: number;
   listCategories: Category[] = [];
   size: number;
   filteringValue: string;
   pageEvent: PageEvent;

  constructor(private categoriesService: CategoriesService , private route: Router ) { }

  ngOnInit(): void {
    this.categoriesService.listCategories(0 , 6).pipe(
      map((categoryData: CategoryPaging) => {
        this.dataSource = categoryData;
        this.categories = this.dataSource.content;
        this.totalElements = this.dataSource.totalElements;
        this.size = this.dataSource.size;
      })
    ).subscribe();

    this.categoriesService.getCategories().subscribe(
      (categoryData => {
        this.listCategories = categoryData;
      })
    )
  }


  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    console.log(page);
    console.log(size);

    if(this.filteringValue == undefined) {
      this.categoriesService.listCategories(page , size).pipe(
        map((categoryData: CategoryPaging) => {
          this.dataSource = categoryData;
          this.categories = this.dataSource.content;
        })
      ).subscribe();
    }
    else  {
      this.categoriesService.filteringWithCategoryNameList(page , size , this.filteringValue).pipe(
        map((categoryData: CategoryPaging) => {
          this.dataSource = categoryData;
          this.categories = this.dataSource.content;
        })
      );
    }
  }

  onFilteringWithCategoryName(keyword: string) {
    this.categoriesService.filteringWithCategoryNameList(0 , 6 , keyword).pipe(
      map((categoryData: CategoryPaging) => {
        this.dataSource = categoryData;
        this.categories = this.dataSource.content;
      })
    ).subscribe();
  }

  createCategory() {
    this.route.navigate(['admin/createCategory'])
  }

  detailCategory(id: number) {
    this.route.navigate(['admin/detailCategory' , id])
  }

}
