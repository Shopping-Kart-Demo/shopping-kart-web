import {Injectable} from '@angular/core';
import {User} from 'src/app/interfaces/user';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }


  public signUp(user: User): Observable<any> {

    return this.httpClient.post(environment.host + '/register',
      user, {headers: this.header()});
    
  }

  public login(username: string, password: string, recaptcha: string): Observable<any> {

    return this.httpClient.post(environment.host + '/login',
      {username: username, password: password, recaptchaToken: recaptcha},
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
  


  // public async logOut(): Promise<void> {
  
  //   return this.firebaseAuth.auth.signOut();
  // }



  


}

