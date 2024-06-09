import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreanceDto} from "../../entities/creance-dto";
import {environment} from "../../../environments/environment.development";
import {SessionService} from "../../components/utils/session/session.service";

@Injectable({
  providedIn: 'root'
})
export class CreanceService {

  private baseUrl = 'http://localhost:8080/api/creances';
  private jsonHttpOptions: { headers: HttpHeaders } =   {
    headers: new HttpHeaders({}).set('Authorization', 'Bearer ' + this.session.getToken())
  };
  constructor(private http: HttpClient,private session: SessionService) { }

  getAllCreances(): Observable<CreanceDto[]> {
    return this.http.get<CreanceDto[]>(this.baseUrl,this.jsonHttpOptions);
  }

  getCreance(id: number): Observable<CreanceDto> {
    return this.http.get<CreanceDto>(`${this.baseUrl}/${id}`,this.jsonHttpOptions);
  }
  getCreancesByCreancierId(id: number): Observable<CreanceDto[]> {
    return this.http.get<CreanceDto[]>(`${this.baseUrl}/creancier/${id}`,this.jsonHttpOptions);
  }

  createCreance(creanceDto: CreanceDto): Observable<CreanceDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CreanceDto>(this.baseUrl, creanceDto, { headers });
  }

  updateCreance(id: number, creanceDto: CreanceDto): Observable<CreanceDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<CreanceDto>(`${this.baseUrl}/${id}`, creanceDto, { headers });
  }

  deleteCreance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
