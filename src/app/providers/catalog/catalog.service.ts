import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponseHttp } from 'src/app/interfaces/base-response-http';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  public getIdentificationTypes(): Observable<BaseResponseHttp> {

    return this.httpClient.get<BaseResponseHttp>(environment.host + '/idtype',
      {headers: this.header()});
  }

  public getGenders(): Observable<BaseResponseHttp> {

    return this.httpClient.get<BaseResponseHttp>(environment.host + '/gender',
      {headers: this.header()});
  }

  private header(): HttpHeaders {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    const token: string = this.cookieService.get('token');
    if (token) { 

      headers = headers.set('authorization', 'Bearer ' + token);
    }

    return headers;
  }
}
