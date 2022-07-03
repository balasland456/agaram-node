import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { IUser, UserType } from 'src/app/shared/types';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  formData: IUser = {
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
  }

  hide: boolean = true;
  constructor(private _userService: UserService, private _snackBar: MatSnackBar, private _matDialogRef: MatDialogRef<CreateUserComponent>) { }

  ngOnInit(): void {
  }

  onSave(): void {
    console.log(this.formData);
    this._userService.saveUser(this.formData).subscribe({
      next: (data) => {
        this._snackBar.open("User created successfully.", "", {
          duration: 3000,
        });
        this._matDialogRef.close();
      },
      error: (err) => {
        this._snackBar.open(err?.error?.error, "OK");
      }
    })
  }

}
