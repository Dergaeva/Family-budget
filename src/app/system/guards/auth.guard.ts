import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser.id > 1) {
      console.log('Юзер', currentUser.id);
      window.confirm('Извините, но у Вас не достаточно прав для доступа');
      return false;
    } else if (currentUser.id === 1) {
      console.log('Админ', currentUser.id);
      return true;
    }
    return false;
    // this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});


  }
}
