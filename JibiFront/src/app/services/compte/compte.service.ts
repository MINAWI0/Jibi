import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {SessionService} from "../../components/utils/session/session.service";

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private tel!: string
  private storageKey = 'currentCompte';
  private compteSubject = new BehaviorSubject<any>(this.getInitialCompte());
  compte$ = this.compteSubject.asObservable();

  constructor(private http: HttpClient,private session: SessionService) {
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
    return this.session.getComptePayment();
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
