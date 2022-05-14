import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-user',
  templateUrl: './side-bar-user.component.html',
  styleUrls: ['./side-bar-user.component.scss']
})
export class SideBarUserComponent implements OnInit {

  @Input()
  heading: string = ""

  constructor() { }

  ngOnInit(): void {
  }

}
