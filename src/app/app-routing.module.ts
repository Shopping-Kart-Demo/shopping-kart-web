import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [

    {
      path: 'onboarding',
      loadChildren: './onboarding/onboarding.module#OnboardingModule'
    },
    {
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
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
  ]
})
export class AppRoutingModule { }
