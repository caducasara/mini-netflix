import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';
import { SiginComponent } from './modules/auth/sigin/sigin.component';

const routes: Routes = [
  {
    path:'',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [AuthGuard]
  },
  {
    path:'singin',
    component: SiginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
