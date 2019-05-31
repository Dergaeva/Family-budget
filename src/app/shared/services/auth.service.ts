import {OnInit, Output} from '@angular/core';
import {User} from '../models/user.model';

export class AuthService implements OnInit {
  private isAuthenticated = false;
  @Output() user: User;

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
