import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser, ResponseDTO } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  saveUser(user: IUser): Observable<ResponseDTO<IUser>> {
    return this._http.post<ResponseDTO<IUser>>(`${environment.serverUrl}/user/add`, user, {
      withCredentials: true,
    });
  }
}
