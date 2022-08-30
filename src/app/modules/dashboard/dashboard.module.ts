import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { HomeComponent } from './pages/home/home.component';
import { MetricsComponent } from './pages/metrics/metrics.component';
import { ProfileComponent } from './pages/profile/profile.component';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    MetricsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule
  ]
})
export class DashboardModule { }
