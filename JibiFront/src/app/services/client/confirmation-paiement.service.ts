import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfirmationPaiementDto} from "../../entities/confirmation-paiement-dto";
import {Observable} from "rxjs";
import {SessionService} from "../../components/utils/session/session.service";


@Injectable({
  providedIn: 'root'
})
export class ConfirmationPaiementService {
  private apiUrl = 'http://localhost:8080/api/confirmationPaiements';
  constructor(private http: HttpClient) {}

  private jsonHttpOptions: { headers: HttpHeaders } =   {
    headers: new HttpHeaders({}).set('Authorization', 'Bearer ' + new SessionService().getToken())
  };

  getConfirmationsByComptePaiementId(comptePaiementId: string): Observable<ConfirmationPaiementDto[]> {
    return this.http.get<ConfirmationPaiementDto[]>(`${this.apiUrl}/comptePaiement/${comptePaiementId}`);
  }
}
