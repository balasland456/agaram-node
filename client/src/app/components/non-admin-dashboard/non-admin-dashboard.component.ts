import { Component, OnInit } from '@angular/core';
import IArticle from 'src/app/shared/types';

@Component({
  selector: 'app-non-admin-dashboard',
  templateUrl: './non-admin-dashboard.component.html',
  styleUrls: ['./non-admin-dashboard.component.scss']
})
export class NonAdminDashboardComponent implements OnInit {

  loading: boolean = false;
  displayedColumns: string[] = ["#", "Batch", "Article Type", "Article", "Pages", "Process Type", "Assigned To", "Status", "Date", "CreatedAt", "UpdatedAt"];
  dataSource: IArticle[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }
}
