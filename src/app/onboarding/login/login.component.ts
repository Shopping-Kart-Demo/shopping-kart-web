import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from '../../providers/auth/auth.service';
import { UserService } from '../../providers/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { BaseResponseHttp } from 'src/app/interfaces/base-response-http';
import { ReCaptchaV3Service, InvisibleReCaptchaComponent } from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentCanDeactivate } from 'src/app/guard/can-deactive.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends ComponentCanDeactivate implements OnInit {

  @ViewChild('captchaElem', { static: false }) captchaElem: InvisibleReCaptchaComponent;

  public loginForm: FormGroup;
  public hide: boolean = true;
  // public apiKey: string = environment.apikeyRecaptchaV3;
  public apiKey: string = environment.apikeyRecaptchaInvisibleV2;
  public recaptcha: string;
  public isLoginError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService,
    private defaultToastService: ToastrService,
    // private reCaptchaV3Service: ReCaptchaV3Service
  ) {
    super();
  }

  // execute(): void {
  //   this.captchaElem.execute();

  // }
  canDeactivate(): boolean {
    return this.loginForm.valid || !this.loginForm.dirty
  }


  ngOnInit() {

    this.loginForm = this.formBuilder.group(
      {
        username: new FormControl('', Validators.compose([
          Validators.required
        ])),

        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ]))
      }
    );

    // this.reCaptchaV3Service.execute(this.apiKey, 'localhost', (token) => {

    //   this.loginForm.controls['recaptcha'].setValue(token);
    // }, {
    //   useGlobalDomain: true
    // });
  }

  // public ngAfterViewInit(): void {

  //   setTimeout(() => {

  //     this.captchaElem.execute();
  //   }, 1000)

  // }


  public recaptchaToken(): void {
  
    this.captchaElem.execute();

}

  public handleSuccess(event: any): void {
    this.recaptcha = event;
    this.onSubmit();
  }

  public onSubmit(): void {

    if (this.loginForm.valid) {

      if (this.recaptcha) {
        this.authService.login(
          this.loginForm.controls['username'].value,
          this.loginForm.controls['password'].value,
          this.recaptcha

        ).subscribe((data: BaseResponseHttp) => {

          if (data) {
            this.cookieService.set('token', data.token);

            this.userService.userInfo().subscribe((userInfo: BaseResponseHttp) => {

              if (userInfo) {

                const userInfoString: string = JSON.stringify(userInfo.data);
                this.cookieService.set('userInfo', userInfoString);
                this.router.navigate(['/dashboard']);
              }

              if (userInfo.status = "success") {
                this.defaultToastService.success('Bienvenido', 'Ingresando al Sistema');
              }
            });
          }

        }, (err: HttpErrorResponse) => {
          this.isLoginError = true;
          this.revert();

        }
        );

      }
    }
  }

  revert() {
    this.loginForm.reset();
    this.captchaElem.resetCaptcha();
  }


}


