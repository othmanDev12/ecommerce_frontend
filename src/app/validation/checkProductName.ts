import {ProductService} from '../shared/product.service';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../modules/product';

export function checkDuplicatedProductName(productService: ProductService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{[key: string]: boolean} | null> => {
    if(control.value != null && control.value != '') {
      return productService.getList().pipe(
        map((products: Product[]) => {
          if(products.length != 0) {
            let matched = false;
            for (let i = 0 ; i < products.length ; i++) {
              if(products[i].productName === control.value) {
                matched = true;
                break;
              }
            }
            if(matched) {
              return {duplicatedProductName: true};
            }
            else {
              return null;
            }
          }
          else {
            return null;
          }
        })
      )
    }
    return of(null);
  }
}
