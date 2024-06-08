import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ComptePaiementDto} from "../../entities/comptePaiement-dto";
import {environment} from "../../../environments/environment.development";
import {SessionService} from "../../components/utils/session/session.service";

interface TransferRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
}
@Injectable({
  providedIn: 'root'
})
export class ComptePaiementService {

  private baseUrl = 'http://localhost:8080/api/comptePaiements';

  private jsonHttpOptions: { headers: HttpHeaders } =   {
    headers: new HttpHeaders({}).set('Authorization', 'Bearer ' + this.session.getToken())
  };

  constructor(private http: HttpClient, private session: SessionService) { }

  createComptePaiement(comptePaiementDto: ComptePaiementDto): Observable<ComptePaiementDto> {
    return this.http.post<ComptePaiementDto>(this.baseUrl, comptePaiementDto,this.jsonHttpOptions);
  }

  getComptePaiement(id: string): Observable<ComptePaiementDto> {
    console.log(this.session.getToken())
    return this.http.get<ComptePaiementDto>(`${this.baseUrl}/${id}`);
  }

  getAllComptePaiements(): Observable<ComptePaiementDto[]> {
    return this.http.get<ComptePaiementDto[]>(this.baseUrl,this.jsonHttpOptions);
  }

  partialUpdateComptePaiement(id: string, comptePaiementDto: ComptePaiementDto): Observable<ComptePaiementDto> {
    return this.http.patch<ComptePaiementDto>(`${this.baseUrl}/${id}`, comptePaiementDto,this.jsonHttpOptions);
  }

  payer(id: string, creanceId: number, montant: number): Observable<ComptePaiementDto> {
    let params = new HttpParams()
      .set('creanceId', creanceId.toString())
      .set('montant', montant.toString());
    return this.http.post<ComptePaiementDto>(`${this.baseUrl}/${id}/payer`, {}, { params });
  }

  deleteComptePaiement(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`,this.jsonHttpOptions);
  }

  rechargeSolde(id: string, montant: number): Observable<ComptePaiementDto> {
    let params = new HttpParams().set('montant', montant.toString());
    return this.http.post<ComptePaiementDto>(`${this.baseUrl}/${id}/recharge`, {}, { params });
  }

  transferSolde(transferRequest: TransferRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/transfer`, transferRequest);
  }

}
