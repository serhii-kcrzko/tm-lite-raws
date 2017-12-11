import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {
  static BASE_URL = process.env.BACKEND_DB || 'http://localhost:9000';

  constructor(private http: Http) { }

  query(URL: string, params?: Array<string>): Observable<any[]> {
    let queryUrl = `${BackendService.BASE_URL}${URL}`;
    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;
    }

    return this.http.request(queryUrl).map((res: any) => res.json());
  }

  getRaws(): Observable<any[]> {
    return this.query('/raws');
  }

  getRaw(id: string) {
    return this.query(`/raws/${id}`);
  }

  deleteItem(id: string) {
    return this.http.delete(`${BackendService.BASE_URL}/raws/${id}`)
      .map((res: any) => res.json());
  }
}

export const BACKEND_PROVIDERS: Array<any> = [
  { provide: BackendService, useClass: BackendService }
];

