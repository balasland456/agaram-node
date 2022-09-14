import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from 'src/app/services/article.service';
import IArticle, {FilterStatus} from 'src/app/shared/types';
import { ArticleDeleteComponent } from '../article-delete/article-delete.component';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { ArticleImportComponent } from '../article-import/article-import.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();
  searched:boolean = false;
  statusOptions = Object.keys(FilterStatus);
  status: FilterStatus = FilterStatus.ALL;
  client:string = "";
  displayedColumns: string[] = [
    '#',
    'Client',
    'Batch/JOB ID',
    // 'Article Type',
    'Article/ISBN',
    'Pages',
    'Input Type',
    'Complexity',
    'Process Type',
    'Math Count',
    'Images Count',
    'Assigned To',
    'Status',    
    'Created Date',
    'Last Updated',
    'Completed Date',
    'Closed Date',
  ];
  dataSource: IArticle[] = [];

  loading: boolean = false;

  constructor(
    private _articleService: ArticleService,
    private _matDialog: MatDialog
  ) {
    this.getArticles();
  }

  getArticles(): void {
    this.loading = true;
    this._articleService.getAllArticle(1, 10).subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource = data.data as IArticle[];
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    });
  }

  openCreateArticle() {
    const matDialogRef = this._matDialog.open(ArticleFormComponent, {
      data: {
        updateArticle: false,
        title: 'Create Article',
      },
    });
    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getArticles();
      }
    });
  }

  openUpdateArticle(data: IArticle) {
    const matDialogRef = this._matDialog.open(ArticleFormComponent, {
      data: {
        updateArticle: true,
        title: 'Update Article',
        status: data.status,
        article: data,
      },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getArticles();
      }
    });
  }

  openDeleteArticle(data: IArticle) {
    const matDialogRef = this._matDialog.open(ArticleDeleteComponent, {
      data: {
        _id: data._id,
      },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getArticles();
      }
    });
  }

  searchArticle(): void {
    this.loading = true;
    this._articleService.searchArticle(1, 10, this.startDate, this.endDate,this.status,this.client,false,"").subscribe({
      next: (data) => {
        this.searched = true;
        this.loading = false;
        this.dataSource = data.data!;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    })
  }

  ngOnInit(): void {}

  exportDashboard():void{
    this.loading = true;
    this._articleService.exportDashboard(this.startDate, this.endDate,this.searched,this.status,this.client,false,"").subscribe((data:any)=>{
      this.loading = false;
      let url = window.URL.createObjectURL(data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = "Dasboard.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
  }
  importDashboard():void{
    const matDialogRef = this._matDialog.open(ArticleImportComponent, {
      data: {},
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getArticles();
      }
    });
  }
}
