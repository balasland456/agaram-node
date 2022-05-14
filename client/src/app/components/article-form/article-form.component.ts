import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from 'src/app/services/article.service';
import IArticle, { IArticleSave, Status } from 'src/app/shared/types';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  articleType: string = "";
  article: string = "";
  pages: number = 0;
  processType: string = "";
  status: Status = Status.ASSIGNED;

  statusOptions = Object.keys(Status);

  constructor(private _articleService: ArticleService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<ArticleFormComponent>, @Inject(MAT_DIALOG_DATA) public data: { updateArticle: boolean, title: string, status: Status, article: IArticle}) {

    if (this.data.status) {
      this.status = this.data.status;
    }
  }

  ngOnInit(): void {
  }

  onSave(): void {
    const data: IArticleSave = {
      articleTypes: this.articleType,
      article: this.article,
      pages: this.pages,
      processType: this.processType,
      assignedTo: "",
      status: Status.ASSIGNED
    }

    this._articleService.saveArticle(data).subscribe({
      next: (data) => {
        console.log(data);
        this._snackBar.open('Article saved', "", {
          duration: 3000
        });
        this._dialog.close(true);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateArticle(): void {
    this.data.article.status =  this.status;
    this._articleService.updateArticle(this.data.article, this.data.article._id!).subscribe({
      next: (data) => {
        console.log(data);
        this._snackBar.open('Article updated', "", {
          duration: 3000
        });
        this._dialog.close(true);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
