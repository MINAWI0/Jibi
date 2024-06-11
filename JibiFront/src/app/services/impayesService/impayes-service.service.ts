import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ImpayeDto} from "../../entities/ImpayeDto";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ImpayesServiceService {

  private baseUrl = environment.apiUrl+'/api/impayes';

  constructor(private http: HttpClient) { }

  getImpayeByFacture(numFacture: number): Observable<ImpayeDto[]>{
    return this.http.get<ImpayeDto[]>(this.baseUrl+'/facture/'+numFacture)
  }

  deleteImpaye(impayeId: number): Observable<void> {
   return  this.http.delete<void>(this.baseUrl+'/'+impayeId)
  }

}
