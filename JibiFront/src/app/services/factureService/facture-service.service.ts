import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FactureDto} from "../../entities/facture-dto";
import {environment} from "../../../environments/environment.development";
import {SessionService} from "../../components/utils/session/session.service";

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private baseUrl = environment.apiUrl+'/api/factures';
  private jsonHttpOptions: { headers: HttpHeaders } =   {
    headers: new HttpHeaders({}).set('Authorization', 'Bearer ' + this.session.getToken())
  };

  constructor(private http: HttpClient,private session: SessionService) { }

  getAllFactures(): Observable<FactureDto[]> {
    return this.http.get<FactureDto[]>(this.baseUrl,this.jsonHttpOptions);
  }

  getFacture(id: number): Observable<FactureDto> {
    return this.http.get<FactureDto>(`${this.baseUrl}/${id}`,this.jsonHttpOptions);
  }

  createFacture(factureDto: FactureDto): Observable<FactureDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<FactureDto>(this.baseUrl, factureDto, { headers });
  }

  updateFacture(id: number, factureDto: FactureDto): Observable<FactureDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<FactureDto>(`${this.baseUrl}/${id}`, factureDto, { headers });
  }

  deleteFacture(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`,this.jsonHttpOptions);
  }
}
