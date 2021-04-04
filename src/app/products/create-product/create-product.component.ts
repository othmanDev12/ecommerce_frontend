import {Component, Input, OnInit} from '@angular/core';
import {MyBrand} from '../../enums/myBrand';
import {MyGeneration} from '../../enums/myGeneration';
import {Category} from '../../modules/category';
import {CategoriesService} from '../../shared/categories.service';
import {map} from 'rxjs/operators';
import {Promotion} from '../../modules/promotion';
import {PromotionService} from '../../shared/promotion.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {checkDuplicatedProductName} from '../../validation/checkProductName';
import {ProductService} from '../../shared/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../modules/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent implements OnInit {

  myBrand = MyBrand;
  keys = [];
  showImage: boolean;
  myGeneration = MyGeneration;
  generationKeys = [];
  toggleImage: boolean;
  categories: Category[] = [];
  promotions: Promotion[] = [];
  categoryId: number;
  promotionId: number;
  isCreateMode: boolean;
  id: number;
  image: Blob;
  editImage: boolean = true;
  promotion: Promotion;
  category: Category;
  productForm: FormGroup;
  selectedFile: File;

  url: any;

  constructor(private categoryService: CategoriesService, private  promotionService: PromotionService ,
              private productService: ProductService, private formBuilder: FormBuilder ,
              private router: Router , private route: ActivatedRoute) {
    // @ts-ignore
    this.keys = Object.keys(this.myBrand);
    // @ts-ignore
    this.generationKeys = Object.keys(this.myGeneration);
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.categoryId = this.route.snapshot.params['categoryId'];
    console.log(this.categoryId);
    this.promotionId = this.route.snapshot.params['promotionId'];
    console.log(this.promotionId);
    this.isCreateMode = !this.id;

    this.productForm = this.formBuilder.group({
      productName: ['' , Validators.required , checkDuplicatedProductName(this.productService)],
      brand: ['' , Validators.required],
      model: ['' , Validators.required],
      cpu: ['' , Validators.required],
      generation: ['' , Validators.required],
      price: ['' , Validators.required],
      releaseDate: ['' , Validators.required],
      category: ['' , Validators.required],
      promotion: ['' , Validators.required],
      ram: ['' , Validators.required],
      description: ['' , Validators.required],
      file: ['']
    });
    this.categoriesRequest();
    this.promotionsRequest();
    if(!this.isCreateMode)  {
      this.onGetProductData();
    }
  }

  onGetProductData() {
    this.productService.getProduct(this.id , this.categoryId , this.promotionId).pipe(
      map((productData: Product) => {
        this.image = productData.image;
        this.productForm.patchValue(productData);
      })
    ).subscribe();
  }

  categoriesRequest() {
    this.categoryService.getCategories().subscribe(
      (categoriesData) => {
        this.categories = categoriesData;
      }
    );
  }

  promotionsRequest() {
    this.promotionService.getPromotions().subscribe(
      (promotionsData) => {
        this.promotions = promotionsData;
      }
    );
  }


  onSubmit() {
    let formData = new FormData();
    formData.append('productName' , this.productForm.controls.productName.value);
    formData.append('brand' , this.productForm.controls.brand.value);
    formData.append('model' , this.productForm.controls.model.value);
    formData.append('cpu' , this.productForm.controls.cpu.value);
    formData.append('generation' , this.productForm.controls.generation.value);
    formData.append('price' , this.productForm.controls.price.value);
    formData.append('releaseDate' , this.productForm.controls.releaseDate.value);
    formData.append('category' , this.productForm.controls.category.value);
    formData.append('promotion' , this.productForm.controls.promotion.value);
    formData.append('ram' , this.productForm.controls.ram.value);
    formData.append('description' , this.productForm.controls.description.value);
    formData.append('file' , this.selectedFile , this.selectedFile.name);
    let categoryId: number = this.productForm.controls.category.value;
    let promotionId: number = this.productForm.controls.promotion.value;

    if(this.isCreateMode)  {
      this.productService.createProduct(promotionId , categoryId , formData)
      .subscribe(formProductData => {
        console.log(formProductData);
        this.redirectToProductList();
      });
      alert("this product was saved successfully");
    }
    if(!this.isCreateMode) {
      this.productService.updateProduct(this.categoryId , this.promotionId , this.id , formData)
        .subscribe(formProductData => {
          console.log(formProductData);
          this.redirectToProductList();
        });
      alert("this product was updated successfully");
    }

  }

  onReset() {
    this.productForm.reset();
  }

  onChangeFile(event: any) {
    this.selectedFile = event.target.files[0];
    if(event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.url = (event.target as FileReader).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    if(!this.isCreateMode) {
      this.showImage = true;
      this.toggleImage = true;
    }
    else {
      this.toggleImage = true;
      this.showImage = true;
    }
  }

  redirectToProductList() {
    this.router.navigate(['admin/listProducts']);
  }

}
