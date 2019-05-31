import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';


@Injectable()
export class GuestGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/system/bill']);
      return false;
    }
    return true;
  }
}
