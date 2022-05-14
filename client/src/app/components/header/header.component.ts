import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { UserType } from 'src/app/shared/types';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  isLoginUrl: boolean = false;
  link: string = "";

  constructor(private dialog: MatDialog, private _authService: AuthService) {
    this.isLoggedIn = this._authService.isUserLoggedIn();
    const user = this._authService.getLoggedInUser();
    this.link = user?.type === UserType.NON_ADMIN ? "non-admin-dashboard" : "admin-dashboard";
  }

  ngOnInit(): void {
  }

  openLogout(): void {
    this.dialog.open(LogoutComponent);
  }


}
