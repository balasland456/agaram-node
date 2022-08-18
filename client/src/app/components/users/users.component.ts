import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { IUser, UserType } from 'src/app/shared/types';
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
    const editdata :IUser = {
      username: "",
      employeeId: "",
      contactPerson: {
        email: "",
        mobileNo: "",
        name: ""
      },
      email: "",
      mobileNo: "",
      password: "",
      type: UserType.EMP,
      name: "",
      address: "",
      _id:""
    }
    const dialogRef = this._dialog.open(CreateUserComponent,{
      data: {
        updateUser: false,
        title: 'Create User',
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getAllUsers();
      }
    });
  }

  editUser(editdata:IUser): void {
    const dialogRef = this._dialog.open(CreateUserComponent,{
      data: {
        updateUser: true,
        title: 'Update User',
        user: editdata,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getAllUsers();
      }
    });
  }
  deleteUser(editdata:IUser): void {
  }
  exportUsers():void{
    this.loading = true;
    this._userService.exportUsers().subscribe((data:any)=>{
      this.loading = false;
      let url = window.URL.createObjectURL(data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = "Users.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
    // this._userService.exportUsers().subscribe({
    //   next: (data) => {
    //     this.loading = false;
    //     debugger
    //   },
    //   error: (err) => {
    //     debugger
    //     this.loading = false;
    //     console.error(err);
    //   }
    // })
  }
}
