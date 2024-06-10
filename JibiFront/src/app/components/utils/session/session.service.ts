import { Injectable } from '@angular/core';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";
import {Observable} from "rxjs";
import {ClientDto} from "../../../entities/client-dto";
@Injectable({
  providedIn: 'root'
})


export class SessionService {
  private key = 'user';
  public tel!: string


  constructor(private http: HttpClient) {}

  setSessionData(value: any): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  getSessionData(): any {
    if (typeof localStorage !== 'undefined')
    {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : null;
    }
  }


  getUser(): any{
    return this.getSessionData() ? this.decodeToken().user : null;
  }
  getUserInfos(): any{
    return this.getSessionData() ? this.decodeToken().userInfos : null;
  }
  getComptePayment(): any {
    return this.getSessionData() ? this.decodeToken().compte : null;
  }

  getRole(): any {
    return this.getSessionData() ? this.decodeToken().role : null;
  }

  getToken(): any {
    return  this.getSessionData() ? this.getSessionData().token : null;
  }

  clearSessionData(): void {
    localStorage.removeItem(this.key);
  }

  decodeToken(): any {
    return this.getSessionData() ? jwtDecode<CustomJwtPayload>(this.getToken()) : null;
  }

  isLoggedIn(): boolean {
    return this.getSessionData() !== null;
  }


}
export interface CustomJwtPayload extends JwtPayload {
  role?: string;
  user?: number;
  compte?: number;
  userInfos?: any
}
