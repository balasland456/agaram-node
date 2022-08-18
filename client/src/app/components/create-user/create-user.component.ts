import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { IUser, UserType, Status } from 'src/app/shared/types';

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
    _id:""
  }

  hide: boolean = true;  
  update: boolean = false;
  constructor(private _userService: UserService, private _snackBar: MatSnackBar, private _matDialogRef: MatDialogRef<CreateUserComponent>,@Inject(MAT_DIALOG_DATA) public data: { updateUser: boolean, title: string, status: Status, user: IUser}) { 
    if(this.data.updateUser) {
      this.formData = this.data.user;
    }
  }

  ngOnInit(): void {
  }

  onSave(): void { 
    this._userService.saveUser(this.formData).subscribe({
      next: (data) => {
        this._snackBar.open("User created successfully.", "", {
          duration: 3000,
        });
        this._matDialogRef.close(true);
      },
      error: (err) => {
        let errorMsg :string[] = [];       
        if(Array.isArray(err?.error?.error)){
          err?.error?.error.forEach((errrr:any) => {
              errorMsg.push(errrr?.error)
          });
          this._snackBar.open(errorMsg.join(","), "OK");
        }
        else{
          this._snackBar.open(err?.error?.error, "OK");
        }   
      }
    })
  }
  updateUser():void {
    this._userService.updateUser(this.formData, this.data.user._id!).subscribe({
      next: (data) => {
        this._snackBar.open("User updated successfully.", "", {
          duration: 3000,
        });
        this._matDialogRef.close(true);
      },
      error: (err) => {
        let errorMsg :string[] = [];       
        if(Array.isArray(err?.error)){
          err?.error.forEach((errrr:any) => {
              errorMsg.push(errrr?.error)
          });
          this._snackBar.open(errorMsg.join(","), "OK");
        }
        else{
          this._snackBar.open(err?.error?.error, "OK");
        }       
      }
    })
  }
}
