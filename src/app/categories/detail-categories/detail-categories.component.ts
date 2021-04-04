import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../shared/categories.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../modules/category';

@Component({
  selector: 'app-detail-categories',
  templateUrl: './detail-categories.component.html',
  styleUrls: ['./detail-categories.component.css']
})
export class DetailCategoriesComponent implements OnInit {
  id: number;
  categoryName: string;
  categories: Category[];

  constructor(private categoryService: CategoriesService  , private router: ActivatedRoute ,
              private route: Router) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.categoryService.getCategory(this.id).subscribe(
        (data: Category) => {
          this.categoryName = data.categoryName;
        }
    )
  }

  onRedirectToListCategory() {
    this.route.navigate(['admin/listCategories']);
  }

  onUpdateCategory(id: number) {
    this.route.navigate(['admin/updateCategory' , id])
  }

  onDelete(id: number) {
    this.categoryService.delete(id).subscribe(
        (data: Category) => {
          confirm("are you sure that you want to delete this category with id " + id)
          this.onRedirectToListCategory()
        });
  }

}
