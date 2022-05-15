import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from './material.module';
import { NonAdminDashboardComponent } from './components/non-admin-dashboard/non-admin-dashboard.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleDeleteComponent } from './components/article-delete/article-delete.component';
import { LoginComponent } from './components/login/login.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { UsersComponent } from './components/users/users.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { SideBarUserComponent } from './components/side-bar-user/side-bar-user.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ResponseInterceptorService } from './services/response-interceptor.service';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { TransactionDeleteComponent } from './components/transaction-delete/transaction-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    DashboardComponent,
    NonAdminDashboardComponent,
    ArticleFormComponent,
    ArticleDeleteComponent,
    LoginComponent,
    TransactionsComponent,
    UsersComponent,
    ResetpasswordComponent,
    SideBarUserComponent,
    LogoutComponent,
    CreateUserComponent,
    TransactionDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
