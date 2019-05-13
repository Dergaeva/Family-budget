import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../models/user.model';
import {BaseApi} from "../core/base-api";

@Injectable()
export class UserService extends BaseApi{
  constructor (public http: HttpClient) {
    super(http);
  }

  getUserbyEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`)
      .map((users: User[]) => users[0] ? users[0] : undefined);
  }

  createNewUser(user: User): Observable<any> {
    return this.post('users', user)
  }
}
