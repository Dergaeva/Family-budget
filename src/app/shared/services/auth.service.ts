import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  user: User;

  constructor(private router: Router) {
  }

  login() {
    this.isAuthenticated = true;
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  logout() {
    this.isAuthenticated = false;
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }


}
