import { ProcessType,InputType,Complexity } from '../../shared/types';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import IArticle, { IArticleSave, IUser, Status } from 'src/app/shared/types';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-article-import-form',
  templateUrl: './article-import.component.html',
  styleUrls: ['./article-import.component.scss']
})
export class ArticleImportComponent implements OnInit {
  jsonData:IArticleSave[]=[];
  constructor(private _authService: AuthService, private _articleService: ArticleService, private _userService:UserService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<ArticleImportComponent>, @Inject(MAT_DIALOG_DATA) public data: { }) {
      
  }
  ngOnInit(): void {
    
  }
  importDashboard():void{
    if(this.jsonData.length>0){    
      this._articleService.importArticle(this.jsonData).subscribe({
        next: (data) => {
          this._snackBar.open('Article imported', "", {
            duration: 3000
          });
          this._dialog.close(true);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else{
      this._snackBar.open('No data found', "", {
        duration: 3000
      });
    }
  }
  convertDate(str:any):Date|undefined{
    if(str instanceof Date){
      return str;
    }
    if(typeof str =="string"){
      let arr = str.split("-");
      return new Date(arr[2]+"-"+arr[1]+"-"+arr[0]);
    }
    return undefined;
  }
  convertData(obj:any){
    let returnObj:IArticleSave={
      client:obj["Client"],
      batch: obj["Batch/JOB ID"],
      article:obj["Article/ISBN"],
      pages: obj["Pages"],
      processType: obj["Process Type"],
      assignedTo: obj["Assigned To"],
      status: obj["Status"],
      complexity:obj["Complexity"],
      inputType:obj["Input Type"],
      mathCount:obj["Math Count"],
      imagesCount:obj["Images Count"],
      closedDate:this.convertDate(obj["Closed Date"]),
      completedDate:this.convertDate(obj["Completed Date"]),
    };
    return returnObj;
  } 
  onFileChange(ev:any) {
    let workBook:any = null;
    let readData = null;
    const reader = new FileReader();
    if(ev.target.files && ev.target.files.length>0){
      const file = ev.target.files[0];
      const ext = file.name.split(".").pop().toLowerCase();
      if(ext=="xlsx"){
        this.jsonData=[];
        reader.onload = (event) => {
          const data = reader.result;
          workBook = XLSX.read(data, { type: 'binary',cellDates: true });
          readData = workBook.SheetNames.reduce((initial:any, name:any) => {
            const sheet = workBook.Sheets[name];
            initial[name] = XLSX.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          if(readData){          
            let arrData = readData[Object.keys(readData)[0]];
            for(let loop=0;loop<arrData.length;loop++){
              debugger;
              if(isNaN(arrData[loop]["Pages"])){
                this._snackBar.open('Pages is numeric field', "", {
                  duration: 3000
                });
                this.jsonData=[];
                break;
              }
              this.jsonData.push(this.convertData(arrData[loop]));
            }
          }
        }
        reader.readAsBinaryString(file);
      }      
      else{
        this._snackBar.open('Upload proper file', "", {
          duration: 3000
        });
      }
    }
    else{
      this._snackBar.open('Upload xlsx file', "", {
        duration: 3000
      });
    }
    
  }
}
