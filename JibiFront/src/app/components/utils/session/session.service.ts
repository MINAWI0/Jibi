import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private key = 'user';

  constructor() { }

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

  getUser(): any {
    return this.getSessionData() ? this.getSessionData().user : null;
  }

  getRole(): any {
    return this.getSessionData() ? this.getSessionData().role : null;
  }

  getToken(): any {
    return this.getSessionData() ? this.getSessionData().token : null;
  }

  clearSessionData(): void {
    localStorage.removeItem(this.key);
  }

  isLoggedIn(): boolean {
    return this.getSessionData() !== null;
  }
}
