import {Injectable} from '@angular/core';
import {User} from '../models/user.model';

@Injectable()
export class AuthService {
  public user: User;

  public get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  login(user: User): void {
    this.user = user;
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    window.localStorage.clear();
    this.user = null;
  }
}
