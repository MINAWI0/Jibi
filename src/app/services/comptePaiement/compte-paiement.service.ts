import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ComptePaiementDto} from "../../entities/comptePaiement-dto";

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

  constructor(private http: HttpClient) { }

  createComptePaiement(comptePaiementDto: ComptePaiementDto): Observable<ComptePaiementDto> {
    return this.http.post<ComptePaiementDto>(this.baseUrl, comptePaiementDto);
  }

  getComptePaiement(id: string): Observable<ComptePaiementDto> {
    return this.http.get<ComptePaiementDto>(`${this.baseUrl}/${id}`);
  }

  getAllComptePaiements(): Observable<ComptePaiementDto[]> {
    return this.http.get<ComptePaiementDto[]>(this.baseUrl);
  }

  partialUpdateComptePaiement(id: string, comptePaiementDto: ComptePaiementDto): Observable<ComptePaiementDto> {
    return this.http.patch<ComptePaiementDto>(`${this.baseUrl}/${id}`, comptePaiementDto);
  }

  payer(id: string, creanceId: number, montant: number): Observable<ComptePaiementDto> {
    let params = new HttpParams()
      .set('creanceId', creanceId.toString())
      .set('montant', montant.toString());
    return this.http.post<ComptePaiementDto>(`${this.baseUrl}/${id}/payer`, {}, { params });
  }

  deleteComptePaiement(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  rechargeSolde(id: string, montant: number): Observable<ComptePaiementDto> {
    let params = new HttpParams().set('montant', montant.toString());
    return this.http.post<ComptePaiementDto>(`${this.baseUrl}/${id}/recharge`, {}, { params });
  }
  transferSolde(transferRequest: TransferRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/transfer`, transferRequest);
  }

}
