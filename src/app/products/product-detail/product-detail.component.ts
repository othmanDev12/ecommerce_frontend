import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../shared/product.service';
import {Product} from '../../modules/product';
import {MyBrand} from '../../enums/myBrand';
import {MyGeneration} from '../../enums/myGeneration';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  categoryId: number;
  promotionId: number;
  productName: string;
  brand: MyBrand
  model: string;
  cpu: string;
  price: number;
  releaseDate: Date;
  ram: string;
  description: string;
  image: Blob;
  generation: MyGeneration;
  category: string;
  promotion: string;

  constructor(private router: Router , private route: ActivatedRoute , private productService: ProductService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.categoryId = this.route.snapshot.params['categoryId'];
    this.promotionId = this.route.snapshot.params['promotionId'];
    this.productService.getProduct(this.id, this.categoryId, this.promotionId).subscribe(
      (productData: Product) => {
        this.productName = productData.productName;
        this.brand = productData.brand;
        this.model = productData.model;
        this.cpu = productData.cpu;
        this.price = productData.price;
        this.releaseDate = productData.releaseDate;
        this.ram = productData.ram;
        this.description = productData.description;
        this.image = productData.image;
        this.category = productData.category.categoryName;
        this.promotion = productData.promotion.promotionName;
      }
    );
  }

  onDeleteProduct(id: number) {
    this.productService.deleteProducts(id)
      .subscribe((product) => {
        if(confirm("are you sure that you want to delete this product with " + id)) {
          this.onRedirectToProductList();
        }
      });
  }

  onUpdateProduct(id: number , categoryId: number , promotionId: number) {
    this.router.navigate(['admin/updateProduct'  , categoryId , promotionId , id]);
  }

  onRedirectToProductList() {
    this.router.navigate(['admin/listProducts']);
  }

}
