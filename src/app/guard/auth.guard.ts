import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from '../providers/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
            private authService: AuthService, 
            private router: Router,
            private cookieService: CookieService,
            private jwt: JwtHelper 
                      ) { }

  canLoad(): boolean {
    try {
      const token = this.cookieService.get('token')
    if (!this.jwt.isTokenExpired(token)) {
      return true;
    }
      this.cookieService.delete('token');
      this.router.navigate(['/onboarding/login']);
      
    } catch (error) {
      this.router.navigate(['/onboarding/login']);
    }
  }

}
