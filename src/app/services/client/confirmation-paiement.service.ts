import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ConfirmationPaiementDto} from "../../entities/confirmation-paiement-dto";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ConfirmationPaiementService {
  private apiUrl = 'http://localhost:8080/api/confirmationPaiements';
  constructor(private http: HttpClient) {}
  getConfirmationsByComptePaiementId(comptePaiementId: string): Observable<ConfirmationPaiementDto[]> {
    return this.http.get<ConfirmationPaiementDto[]>(`${this.apiUrl}/comptePaiement/${comptePaiementId}`);
  }
}
