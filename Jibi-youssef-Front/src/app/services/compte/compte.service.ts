import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private storageKey = 'currentCompte';
  private compteSubject = new BehaviorSubject<any>(this.getInitialCompte());
  compte$ = this.compteSubject.asObservable();

  constructor() {
    const savedCompte = this.getInitialCompte();
    if (savedCompte) {
      this.compteSubject.next(savedCompte);
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  private getInitialCompte(): any {
    if (this.isLocalStorageAvailable()) {
      const savedCompte = localStorage.getItem(this.storageKey);
      return savedCompte ? JSON.parse(savedCompte) : null;
    }
    return null;
  }

  setCompte(compte: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.storageKey, JSON.stringify(compte));
    }
    this.compteSubject.next(compte);
  }

  getCompte(): any {
    return this.compteSubject.getValue();
  }

  clearCompte(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.storageKey);
    }
    this.compteSubject.next(null);
  }
}
