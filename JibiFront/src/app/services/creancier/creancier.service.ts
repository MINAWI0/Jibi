import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreancierDto} from "../../entities/creancier-dto";
import {environment} from "../../../environments/environment.development";
import {SessionService} from "../../components/utils/session/session.service";

@Injectable({
  providedIn: 'root'
})
export class CreancierService {
  private baseUrl = 'http://localhost:8080/api/creanciers';
  private jsonHttpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({}).set('Authorization', 'Bearer ' + new SessionService().getToken())
  }

  constructor(private http: HttpClient) { }


  getAllCreanciers(): Observable<CreancierDto[]> {
    return this.http.get<CreancierDto[]>(this.baseUrl,this.jsonHttpOptions);
  }

  getCreancier(id: string): Observable<CreancierDto> {
    return this.http.get<CreancierDto>(`${this.baseUrl}/${id}`,this.jsonHttpOptions);
  }

}
