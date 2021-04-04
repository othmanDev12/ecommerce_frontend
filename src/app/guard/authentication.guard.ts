/*import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../shared/authentication.service';
import {NotificationService} from '../shared/notification.service';
import {NotificationType} from '../enums/notification-type';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService , private route: Router
              , private notificationService: NotificationService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    if(this.authenticationService.isLoggedIn()) {
      return true;
    }
    this.route.navigate(['/login']);
    this.notificationService.notifier(NotificationType.ERROR , "You need to log in to access this page".toUpperCase());
    return false;
  }

}

 */
