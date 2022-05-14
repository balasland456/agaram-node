import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from 'src/app/services/article.service';
import IArticle from 'src/app/shared/types';
import { ArticleDeleteComponent } from '../article-delete/article-delete.component';
import { ArticleFormComponent } from '../article-form/article-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();
  loading: boolean = false;
  displayedColumns: string[] = [
    'sno',
    'client',
    'batch',
    'articleTypes',
    'article',
    'pages',
    'processType',
    'assignedTo',
    'status',
    'date',
    'createdAt',
    'updatedAt',
    'actions',
  ];
  dataSource: IArticle[] = [];

  constructor(
    private _articleService: ArticleService,
    private _matDialog: MatDialog
  ) {
    this.getArticles();
  }

  getArticles(): void {
    this._articleService.getAllArticle(1, 10).subscribe({
      next: (data) => {
        this.dataSource = data.data as IArticle[];
      },
      error: (err) => {
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
        title: "Update Article",
        status: data.status,
        article: data
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
        _id: data._id
      },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getArticles();
      }
    });
  }

  ngOnInit(): void {}
}
