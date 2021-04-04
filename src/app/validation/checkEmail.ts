import {UsersService} from '../shared/users.service';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {Observable, of} from 'rxjs';
import { map} from 'rxjs/operators';
import {Users} from '../modules/users';
import {UsersPaging} from '../modules/usersPaging';


export function checkDuplicatedEmail(userService: UsersService): AsyncValidatorFn  {
    return (control: AbstractControl): Observable<{ [key: string]: boolean } | null> => {
        // check if the control has a value
      let users: Users[] = [];
      let usersPaging: UsersPaging;
        if (control.value != null && control.value != '') {
           return userService.getUsers().pipe(
                map((resulat: Users[]) => {
                    if(resulat.length != 0) {
                        let matched = false;
                        for (let i = 0; i < resulat.length; i++) {
                            if (resulat[i].email === control.value) {
                                matched = true;
                                break;
                            }
                        }

                        if (matched) {
                            return {duplicatedEmail: true};
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
