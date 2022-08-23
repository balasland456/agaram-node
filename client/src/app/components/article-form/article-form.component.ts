import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import IArticle, { IArticleSave, IUser, Status } from 'src/app/shared/types';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  batch:string = "";
  client:string = "";
  articleType: string = "";
  article: string = "";
  pages: number = 0;
  processType: string = "";
  status: Status = Status.ASSIGNED;
  assignedTo?:string = undefined;
  datefield:Date = new Date();
  statusOptions = Object.keys(Status);
  users : IUser[]|null = [];
  constructor(private _authService: AuthService, private _articleService: ArticleService, private _userService:UserService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<ArticleFormComponent>, @Inject(MAT_DIALOG_DATA) public data: { updateArticle: boolean, title: string, status: Status, article: IArticle}) {
    if(this.data.updateArticle) {
      if(this.data.article.batch)
        this.batch = this.data.article.batch;
      if(this.data.article.client)
        this.client = this.data.article.client;
      if(this.data.article.datefield)
        this.datefield = this.data.article.datefield;
      this.articleType= this.data.article.articleTypes;
      this.article= this.data.article.article;
      this.pages = this.data.article.pages;
      this.processType= this.data.article.processType;
      if(this.data.article.status)
        this.status= Status[this.data.article.status];
      if(this.data.article.assignedTo){
        this.assignedTo = this.data.article.assignedTo._id;
      }
    }
    
    
  }
  ngOnInit(): void {
    this._userService.getNonAdmin().subscribe({
      next: (data) => {        
        if(data.success){
          this.users = data.data;
          if(this.data.article.assignedTo){
            this.assignedTo = this.data.article.assignedTo._id;
          }
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSave(): void {
    const user: IUser | null = this._authService.getLoggedInUser();
    const data: IArticleSave = {
      client:this.client,
      batch:this.batch,
      articleTypes: this.articleType,
      article: this.article,
      pages: this.pages,
      processType: this.processType,
      assignedTo: this.assignedTo,
      status: Status.ASSIGNED,
      datefield:this.datefield
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

    const data: IArticleSave = {
      client:this.client,
      batch:this.batch,
      articleTypes: this.articleType,
      article: this.article,
      pages: this.pages,
      processType: this.processType,
      assignedTo: this.assignedTo,
      status: this.status,
      datefield:this.datefield
    }
    
    this._articleService.updateArticle(data, this.data.article._id!).subscribe({
      next: (data) => {
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
