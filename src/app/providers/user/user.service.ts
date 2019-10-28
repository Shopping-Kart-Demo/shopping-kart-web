import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from 'src/app/interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

const tableName: string = '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: Observable<User>;
  private loggedUser: User;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  public setLoggedUser(user: User) {

    this.loggedUser = user;
  }

  public getLoggedUser(): User {

    return this.loggedUser;
  }

  private header(): HttpHeaders {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    const token: string = this.cookieService.get('token');
    if (token) { 

      headers = headers.set('authorization', 'Bearer ' + token);
    }

    return headers;
  }

  public userInfo(): Observable<any> {
    
    return this.httpClient.get(environment.host + '/info',
      {headers: this.header()});
  }


}
