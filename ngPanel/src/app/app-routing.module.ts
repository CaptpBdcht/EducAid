import { NgModule } from '@angular/core';
import { RouterModule, Routes }	from '@angular/router';

import { DashboardRoutes } from './dashboard/dashboard.routes';
import { LoginRoutes } from './login/login.routes';

const routes: Routes = [
  DashboardRoutes,
  LoginRoutes,
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
