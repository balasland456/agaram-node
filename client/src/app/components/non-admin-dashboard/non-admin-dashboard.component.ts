import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-non-admin-dashboard',
  templateUrl: './non-admin-dashboard.component.html',
  styleUrls: ['./non-admin-dashboard.component.scss']
})
export class NonAdminDashboardComponent implements OnInit {

  loading: boolean = false;
  displayedColumns: string[] = ["sno", "batch", "articleTypes", "article", "pages", "processType", "assignedTo", "status", "date", "createdAt", "updatedAt"];
  dataSource: [] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
