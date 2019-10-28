import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserInfo } from '../interfaces/user-info';
import { AuthService } from '../providers/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userInfo: UserInfo;
  public recaptcha: any;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const userInfoObject: UserInfo = JSON.parse(this.cookieService.get('userInfo'));
    this.userInfo = userInfoObject;
  }



  
  public logOut(): void {
    
    var answer = confirm('Estas seguro de querer salir del Sistema?');

    if(answer) {
  
      // this.authService.logOut().then(() => {

        this.router.navigate(['/onboarding']);
      // });
    }
  }

  public prueba(): void { 
    this.router.navigate(['/purchase']);
  }

}
