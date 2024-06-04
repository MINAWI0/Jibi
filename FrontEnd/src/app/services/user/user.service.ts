import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'currentUser';

  setUser(user: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getUser(): any {
    if (typeof localStorage !== 'undefined')
    {
      const user = localStorage.getItem(this.storageKey);
      return user ? JSON.parse(user) : null;
    }
  }

  clearUser(): void {
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}
