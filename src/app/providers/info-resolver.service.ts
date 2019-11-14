import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserInfo } from '../interfaces/user-info';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';

@Injectable() 
  export class AppResolver implements Resolve<any> { 
    constructor(private cookieService: CookieService) { 

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return of(JSON.parse(this.cookieService.get('userInfo')));
    }
  }

