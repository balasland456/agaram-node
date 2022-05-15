import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/shared/types';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  loading: boolean = false;
  displayedColumns: string[] = [
    '#',
    'Username',
    'Name',
    'Address',
    'ID',
    'Mobile',
    'Email',
    'Contact Person',
    'Contact Person Mobile',
    'Contact Person Email',
  ];
  dataSource: IUser[] = [];

  constructor(private _dialog: MatDialog, private _userService: UserService) {
    this.getAllUsers();
  }

  ngOnInit(): void {}


  getAllUsers(): void {
    this.loading = true;
    this._userService.getAllUsers(1, 10).subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource = data.data!;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    })
  }

  openCreateUser(): void {
    const dialogRef = this._dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }
}
