import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import IArticle, { IArticleSave, ResponseDTO,FilterStatus } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private _http: HttpClient) {}

  saveArticle(article: IArticleSave): Observable<ResponseDTO<IArticle>> {
    return this._http.post<ResponseDTO<IArticle>>(
      `${environment.serverUrl}/article/add`,
      article,
      { withCredentials: true }
    );
  }

  updateArticle(article: IArticleSave, id: string): Observable<ResponseDTO<IArticle>> {
    return this._http.put<ResponseDTO<IArticle>>(
      `${environment.serverUrl}/article/update/${id}`,
      article,
      { withCredentials: true }
    );
  }

  deleteArticle(id: string): Observable<ResponseDTO<IArticle>> {
    return this._http.delete<ResponseDTO<IArticle>>(
      `${environment.serverUrl}/article/delete/${id}`,
      { withCredentials: true }
    );
  }

  getAllArticle(
    page: number,
    pageSize: number,
    userWise:boolean = false,
  ): Observable<ResponseDTO<IArticle[]>> {
    return this._http.get<ResponseDTO<IArticle[]>>(
      `${environment.serverUrl}/article/getall`,
      {
        withCredentials: true,
        params: {
          userWise:userWise,
          page: page,
          pageSize: pageSize,
        },
      }
    );
  }

  searchArticle(
    page: number,
    pageSize: number,
    sd: Date,
    ed: Date,
    status: FilterStatus,
    client: string,
    userWise:boolean = false,
    batch:string,
  ): Observable<ResponseDTO<IArticle[]>> {
    return this._http.get<ResponseDTO<IArticle[]>>(
      `${environment.serverUrl}/article/search`,
      {
        withCredentials: true,
        params: {
          userWise:userWise,
          page: page,
          pageSize: pageSize,
          sd: (sd ? sd.toString():sd),
          ed: (ed ? ed.toString():ed),
          status: (status.toString()),
          client: (client),
          batch:(batch)
        },
      }
    );
  }

  exportDashboard(
    sd: Date,
    ed: Date,
    filter:boolean,
    status: FilterStatus,
    client: string,
    userWise:boolean = false,
    batch:string,
    ):any {
    return this._http.get(
      `${environment.serverUrl}/article/export`,
      {
        withCredentials: true,        
        responseType:"blob",
        params: {
          userWise:userWise,
          sd: sd.toString(),
          ed: ed.toString(),
          filter:filter,
          status: (status.toString()),
          client: (client),
          batch:(batch)
        },
      }
    );
  }

  // getAllArticleByUser(
  //   page: number,
  //   pageSize: number
  // ): Observable<ResponseDTO<IArticle[]>> {
  //   return this._http.get<ResponseDTO<IArticle[]>>(
  //     `${environment.serverUrl}/article/getAllArticleByUser`,
  //     {
  //       withCredentials: true,
  //       params: {
  //         page: page,
  //         pageSize: pageSize,
  //       },
  //     }
  //   );
  // }
}
