import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NonAdminDashboardComponent } from './components/non-admin-dashboard/non-admin-dashboard.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { UsersComponent } from './components/users/users.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { IsAdminGuardService } from './services/is-admin-guard.service';
import { IsNonAdminGuardService } from './services/is-non-admin-guard.service';
import { AuthorizePasswordComponent } from './components/authorize-password/authorize-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService, IsAdminGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'non-admin-dashboard',
    component: NonAdminDashboardComponent,
    canActivate: [AuthGuardService, IsNonAdminGuardService],
  },
  {
    path: 'transaction',
    component: TransactionsComponent,
    canActivate: [AuthGuardService, IsAdminGuardService],
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
    canActivate: [LoginGuardService, IsAdminGuardService],
  },
  {
    path: 'forgot-password-requests',
    component: AuthorizePasswordComponent,
    canActivate: [AuthGuardService, IsAdminGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
