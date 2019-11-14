import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { NgxCaptchaModule } from 'ngx-captcha';


@NgModule({
  declarations: [
    DashboardComponent, 
    PurchaseComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbCarouselModule,
    MatIconModule,
    NgxCaptchaModule,
    MatProgressSpinnerModule
  ]
})
export class DashboardModule { }
