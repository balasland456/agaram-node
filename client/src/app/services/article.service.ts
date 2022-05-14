import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import IArticle, { IArticleSave, ResponseDTO } from '../shared/types';

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
    pageSize: number
  ): Observable<ResponseDTO<IArticle[]>> {
    return this._http.get<ResponseDTO<IArticle[]>>(
      `${environment.serverUrl}/article/getall`,
      {
        withCredentials: true,
        params: {
          page: page,
          pageSize: pageSize,
        },
      }
    );
  }
}
