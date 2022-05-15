import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loading: boolean = false;
  displayedColumns: string[] = ['#', 'userId', 'Name', 'Address', 'ID', 'Mobile','Email','ContactPerson','ContactMobile', 'ContactEmail'];
  dataSource = [
    {
      userId: '291991',
      name: 'suswer',
      address: 'no 17 subash street poes garden chennai 600100',
      employeeId: '29030020',
      mobileNo: '0018928277',
      email:'saravnama@gmail.com',
      contactPerson:{
        mobileNo:'9992922',
        name: 'sa88a9',
        email:'saravnama@gmail.com',
      }
    }
  ];

  constructor(private _dialog: MatDialog) { }


  ngOnInit(): void {

  }

  openCreateUser(): void {
    const dialogRef = this._dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    })
  }

}
