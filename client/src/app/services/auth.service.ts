import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(username: string, password: string):any {
    return this._http.post(`${environment.serverUrl}/auth/login`, { username, password }, { withCredentials: true });
  }

  logout():any {
    return this._http.get(`${environment.serverUrl}/auth/logout`, { withCredentials: true });
  }
}
