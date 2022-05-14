import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:"login",component: LoginComponent},
  { path: "", redirectTo:"admin-dashboard", pathMatch: "full" },
  { path: "admin-dashboard", component: DashboardComponent },
  {path:"transaction", component:TransactionsComponent},
  {path:"users", component:UsersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
