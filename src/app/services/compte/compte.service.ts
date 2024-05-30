import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private storageKey = 'currentCompte';

  setCompte(compte: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(compte));
  }

  getCompte(): any {
    const compte = localStorage.getItem(this.storageKey);
    return compte ? JSON.parse(compte) : null;
  }

  clearCompte(): void {
    localStorage.removeItem(this.storageKey);
  }
}
