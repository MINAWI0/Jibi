import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private key = 'user';

  constructor() { }

  setSessionData(value: any): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }


  setUser(value: any): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  getSessionData(): any {
    if (typeof localStorage !== 'undefined')
    {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : null;
    }
  }

  getUser(): any {
    return this.getSessionData().user;
  }

  getRole(): any {
    return this.getSessionData().role;
  }

  getToken(): any {
    return this.getSessionData().token;
  }

  clearSessionData(): void {
    localStorage.removeItem(this.key);
  }

  clearUser(): void {
    localStorage.removeItem(this.key);
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}
