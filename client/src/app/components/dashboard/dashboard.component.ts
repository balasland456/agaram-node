import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading: boolean = false;
  displayedColumns: string[] = ["sno", "client", "batch", "articleTypes", "article", "pages", "processType", "assignedTo", "status", "date", "createdAt", "updatedAt", "actions"];
  dataSource: [] = [];


  constructor() { }

  ngOnInit(): void {
  }

}
