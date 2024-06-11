import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfirmationPaiementDto} from "../../entities/confirmation-paiement-dto";
import {Observable} from "rxjs";
import {SessionService} from "../../components/utils/session/session.service";
import {environment} from "../../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class ConfirmationPaiementService {
  private comptePaiementId = this.session.getComptePayment().id;
  private apiUrl = environment.apiUrl+'/api/confirmationPaiements';
  constructor(private http: HttpClient,private session: SessionService) {}

  private jsonHttpOptions: { headers: HttpHeaders } =   {
    headers: new HttpHeaders({}).set('Authorization', 'Bearer ' + this.session.getToken())
  };

  getConfirmationsByComptePaiementId(): Observable<ConfirmationPaiementDto[]> {
    console.log(this.session.getComptePayment())
    return this.http.get<ConfirmationPaiementDto[]>(`${this.apiUrl}/comptePaiement/${this.comptePaiementId}`);
  }
}
