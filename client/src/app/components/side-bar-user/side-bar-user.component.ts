import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { IUser, UserType } from 'src/app/shared/types';
import { CreateUserComponent } from '../create-user/create-user.component';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-side-bar-user',
  templateUrl: './side-bar-user.component.html',
  styleUrls: ['./side-bar-user.component.scss']
})
export class SideBarUserComponent implements OnInit {
  isLoggedIn: boolean = false;

  isLoginUrl: boolean = false;
  link: string = "";
  user?:IUser|null=null;
  @Input()
  heading: string = ""

  constructor(private dialog: MatDialog, private _authService: AuthService) { 
    this.isLoggedIn = this._authService.isUserLoggedIn();
    this.user = this._authService.getLoggedInUser();
    this.link = this.user?.type !== UserType.ADMIN ? "non-admin-dashboard" : "admin-dashboard";
  }

  ngOnInit(): void {
  }
  openLogout(): void {
    this.dialog.open(LogoutComponent);
  }
  userDetail():void{
    const dialogRef = this.dialog.open(CreateUserComponent,{
      data: {
        updateUser: true,
        title: 'Update User',
        user: this.user,
        profile:true,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }
}
