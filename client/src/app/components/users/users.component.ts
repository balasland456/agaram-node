import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loading: boolean = false;
  constructor() { }
  displayedColumns: string[] = [ 'userId', 'Name', 'Address', 'ID', 'Mobile','Email','ContactPerson','ContactMobile'];
  dataSource = [
    {
      userId: '291991',
      name: 'suswer',
      address: 'no 17 subash street poes garden chennai 600100',
      id: '29030020',
      mobile: '0018928277',
      email:'saravnama@gmail.com',
      contact:{
        mobile:'9992922',
        name: 'sa88a9'
      }
    }
  ];

  ngOnInit(): void {

  }

}
