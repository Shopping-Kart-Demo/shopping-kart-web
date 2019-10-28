import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {OnboardingComponent} from './onboarding.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
    {
      path: '',
      component: OnboardingComponent,
      children: [
        {
          path: '',
          redirectTo: 'login',
          pathMatch: 'full',
        },
        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: 'sign-up',
          component: SignUpComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
