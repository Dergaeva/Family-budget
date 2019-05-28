import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Bill} from '../models/bill.model';
import {BaseApi} from '../../../shared/core/base-api';


@Injectable()
export class BillService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  getCurrency(base: string = 'EUR'): Observable<any> {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=ac366445108b41e6c6764a436b825555&base=${base}`);
  }
}
