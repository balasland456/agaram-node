import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITransaction, ResponseDTO } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private _http: HttpClient) {}

  getAllTransactions(
    page: number,
    pageSize: number
  ): Observable<ResponseDTO<ITransaction[]>> {
    return this._http.get<ResponseDTO<ITransaction[]>>(
      `${environment.serverUrl}/transaction/getall`,
      {
        params: {
          page: page,
          pageSize: pageSize,
        },
        withCredentials: true,
      }
    );
  }

  deleteArticle(id: string): Observable<ResponseDTO<ITransaction>> {
    return this._http.delete<ResponseDTO<ITransaction>>(
      `${environment.serverUrl}/transaction/delete/${id}`,
      { withCredentials: true }
    );
  }
}
