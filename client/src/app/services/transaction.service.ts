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

  savetransaction(transaction: ITransaction): Observable<ResponseDTO<ITransaction>> {
    return this._http.post<ResponseDTO<ITransaction>>(
      `${environment.serverUrl}/transaction/add`,
      transaction,
      { withCredentials: true }
    );
  }

  updateTransaction(transaction: ITransaction, id: string): Observable<ResponseDTO<ITransaction>> {
    return this._http.put<ResponseDTO<ITransaction>>(
      `${environment.serverUrl}/transaction/update/${id}`,
      transaction,
      { withCredentials: true }
    );
  }

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

  searchTransaction(
    page: number,
    pageSize: number,
    sd: Date,
    ed: Date
  ): Observable<ResponseDTO<ITransaction[]>> {
    return this._http.get<ResponseDTO<ITransaction[]>>(
      `${environment.serverUrl}/transaction/search`,
      {
        withCredentials: true,
        params: {
          page: page,
          pageSize: pageSize,
          sd: sd.toString(),
          ed: ed.toString(),
        },
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
