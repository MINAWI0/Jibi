import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment.development";

interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl: string = environment.apiUrl;
  private jsonHttpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,) {}

  login(loginRequest: LoginRequest): Observable<any> {
    console.log(loginRequest);
    return this.http.post<any>(this.loginUrl+'/login', loginRequest,this.jsonHttpOptions);
  }

  setPassword(userId: number, newPassword: string): Observable<void> {
    const url = `${this.loginUrl}/${userId}/set-password`;
    const params = new HttpParams().set('newPassword', newPassword);
    return this.http.put<void>(url, null, { params });
  }
}
