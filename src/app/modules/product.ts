import {Category} from './category';
import {Promotion} from './promotion';
import {MyBrand} from '../enums/myBrand';
import {MyGeneration} from '../enums/myGeneration';

export interface Product {
  productId: number,
  productName: string,
  brand: MyBrand,
  model: string,
  cpu: string,
  price: number,
  releaseDate: Date,
  ram: string,
  description: string,
  image: Blob,
  generation: MyGeneration,
  category: Category;
  promotion: Promotion;
}
