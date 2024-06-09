import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";
import {ImpayeDto} from "../../entities/ImpayeDto";
@Injectable({
  providedIn: 'root'
})
export class ImpayesServiceService {

  private baseUrl = 'http://localhost:8080/api/creances';

  constructor(private http: HttpClient) { }

  getImpayeByFacture(numFacture: number): Observable<ImpayeDto>{
    return this.http.get<ImpayeDto>(this.baseUrl+'/creancier/'+numFacture)
  }

}
