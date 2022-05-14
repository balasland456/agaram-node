import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NonAdminDashboardComponent } from './components/non-admin-dashboard/non-admin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
  { path: 'admin-dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'non-admin-dashboard', component: NonAdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
