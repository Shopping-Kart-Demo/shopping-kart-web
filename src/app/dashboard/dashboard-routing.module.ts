import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'purchase',
        component: PurchaseComponent
      },
      // {
      //   path: 'rent-car',
      //   component: RentCarComponent
      // },
      {
        path: '',
        redirectTo: 'purchase'
      },
      // {
      //   path: 'create-car',
      //   component: CreateCarComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
