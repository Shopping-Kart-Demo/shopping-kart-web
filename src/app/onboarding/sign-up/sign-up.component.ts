import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from '../../providers/auth/auth.service';
import { UserService } from '../../providers/user/user.service';
import { BaseResponseHttp } from 'src/app/interfaces/base-response-http';
import { Catalog } from 'src/app/interfaces/catalog';
import { CatalogService } from 'src/app/providers/catalog/catalog.service';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InvisibleReCaptchaComponent } from 'ngx-captcha';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentCanDeactivate } from 'src/app/guard/can-deactive.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends ComponentCanDeactivate implements OnInit {

  @ViewChild('captchaElem', { static: false }) captchaElem: InvisibleReCaptchaComponent;

  public signUp: FormGroup;
  public hide: boolean = true;
  public genders: Array<Catalog> = null;
  public idTypes: Array<Catalog> = null;
  public isLoading: boolean = true;
  public isSignUpError:  boolean = false;
  public apiKey: string = environment.apikeyRecaptchaV2Register;
  public recaptcha: string;

  constructor(
    private signBuilder: FormBuilder,
    private authService: AuthService,
    private catalogService: CatalogService,
    private router: Router,
    private defaultToastService: ToastrService,
  ) {
    super();
  }

  canDeactivate(): boolean {
    return this.signUp.valid || !this.signUp.dirty
  }

  ngOnInit() {

    this.initForm();

    forkJoin(
      this.catalogService.getIdentificationTypes(),
      this.catalogService.getGenders()
    ).subscribe((response: Array<any>) => {

      if (response[0] && response[1]) {

        this.genders = response[1];
        this.idTypes = response[0];
        this.isLoading = !this.isLoading;
      }
    });
  }

  public handleSuccess(event): void {
    this.recaptcha = event;
    this.onSubmit();
  }


  // public ngAfterViewInit(): void {

  //   setTimeout(() => {

  //     this.captchaElem.execute();
  //   }, 1000)

  // }

  // public recaptchaTokennterval(): void {

  //   this.captchaElem.execute();

  //   const tReca = setInterval(this.recaptchaToken(),  {
  //     if(this.recaptcha){
  //       clearInterval(tReca)
  //     }
  //     this.captchaElem.execute();
  //   }, 1000);
  // }

  
  // public recaptchaToken(): void {
    
  //    setTimeout(() => {

  //     this.captchaElem.execute();
  //   }, 1000)
  // }

  public recaptchaToken(): void {
  
      this.captchaElem.execute();
  
  }

  public onSubmit(): void {
   
    if (this.signUp.valid) { 

      if (this.recaptcha) {

      const user: User = {
        name: this.signUp.controls['name'].value,
        email: this.signUp.controls['email'].value,
        phone: this.signUp.controls['phone'].value,
        password: this.signUp.controls['password'].value,
        birthdate: this.signUp.controls['birthDate'].value,
        genderId: this.signUp.controls['gender'].value,
        username: this.signUp.controls['username'].value,
        identification: this.signUp.controls['id'].value,
        idTypeId: this.signUp.controls['idType'].value,
        recaptchaToken: this.recaptcha
      };

    this.authService.signUp(user).subscribe((response: BaseResponseHttp) => {

      if (response) {
        if (response.status = "success") { 
          this.defaultToastService.success('Usuario Registrado', 'Ya puede ingresar al Sistema');
          this.router.navigateByUrl('/onboarding/login');
        }
      }

    }, (err: HttpErrorResponse) => {
      this.isSignUpError = true;
      this.revert();
      this.defaultToastService.error('Error al Registrar Usuario', 'Intente Nuevamente');
    }
    );
  } 
}
  }

  private revert(): void { 
    this.signUp.reset();
    this.captchaElem.resetCaptcha();
  }

  private initForm(): void {

    this.signUp = this.signBuilder.group(
      {
        name: new FormControl('', Validators.compose([
          Validators.required
        ])),
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.email
        ])),
        phone: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(8),
        ])),
        username: new FormControl('', Validators.compose([
          Validators.required
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20)
        ])),
        birthDate: new FormControl('', Validators.compose([
          Validators.required
        ])),
        idType: new FormControl('', Validators.compose([
          Validators.required
        ])),
        id: new FormControl('', Validators.compose([
          Validators.required
        ])),
        gender: new FormControl('', Validators.compose([
          Validators.required
        ])),
      }
    );
  }

}
