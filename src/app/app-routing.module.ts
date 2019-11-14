import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AppResolver } from './providers/info-resolver.service';

const appRoutes: Routes = [

    {
      path: 'onboarding',
      loadChildren: './onboarding/onboarding.module#OnboardingModule'
    },
    {
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule',
      canLoad: [AuthGuard],
    },
    {
      path: '',
      redirectTo: 'onboarding',
      pathMatch: 'full'
    }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AppResolver
  ]
})
export class AppRoutingModule { }
