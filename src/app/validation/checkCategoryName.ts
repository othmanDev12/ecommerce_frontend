import {CategoriesService} from '../shared/categories.service';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Category} from '../modules/category';




export function checkDuplicatedCategoryName(categoryService: CategoriesService): AsyncValidatorFn  {
  return (control: AbstractControl): Observable<{ [key: string]: boolean } | null> => {
    // check if the control has a value
    if (control.value != null && control.value != '') {
      return categoryService.getCategories().pipe(
        map((resulat: Category[]) => {
           if (resulat.length != 0) {
            let matched = false;
            for (let i = 0; i < resulat.length; i++) {
              if (resulat[i].categoryName === control.value) {
                matched = true;
                break;
              }
            }

            if (matched) {
              return {duplicatedCategoryName: true};
            } else {
              return null;
            }
          } else {
            return null;
          }
        })
      );
    }
    return of(null);
  };
}
