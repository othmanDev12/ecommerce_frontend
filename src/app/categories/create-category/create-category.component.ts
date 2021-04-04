import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/categories.service';
import {ActivatedRoute, Router} from '@angular/router';
import {checkDuplicatedCategoryName} from '../../validation/checkCategoryName';
import {Category} from '../../modules/category';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  isCreateMode: boolean;
  id: number;
  formData: FormData;

  constructor(private categoryService: CategoriesService , private formBuilder: FormBuilder ,
              private route: Router , private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.isCreateMode = !this.id;
    this.categoryForm = this.formBuilder.group({
      categoryName: ['' , Validators.required , checkDuplicatedCategoryName(this.categoryService)]
    });
    if(!this.isCreateMode) {
      this.onLoadCategoryDetail();
    }
  }

  onLoadCategoryDetail() {
    this.categoryService.getCategory(this.id).subscribe(
        (data: Category) => {
          this.categoryForm.patchValue(data);
        }
    );
  }


  onSubmit() {
    this.formData = new FormData();
    this.formData.append('categoryName' , this.categoryForm.controls.categoryName.value);
    if(this.isCreateMode) {
      this.createCategory();
    }
    else {
      this.updateCategory();
    }
  }

  redirectedToCategoryList() {
    this.route.navigate(['admin/listCategories']);
  }

  createCategory() {
    this.categoryService.craete(this.formData).subscribe(
        (data) => {
          console.log(data);
          this.redirectedToCategoryList();
        }
    )
    alert("this category was created successfully");
  }

  updateCategory() {
    this.categoryService.update(this.formData , this.id).subscribe(
        (data: Category) => {
          console.log(data);
          this.redirectedToCategoryList();
        }
    )
    alert("this category was updated successfully")
  }
  onReset() {
    this.categoryForm.reset();
  }
}
