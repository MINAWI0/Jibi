import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ImpayeDto} from "../../entities/ImpayeDto";

@Injectable({
  providedIn: 'root'
})
export class ImpayesServiceService {

  private baseUrl = 'http://localhost:8080/api/impayes';

  constructor(private http: HttpClient) { }

  getImpayeByFacture(numFacture: number): Observable<ImpayeDto[]>{
    return this.http.get<ImpayeDto[]>(this.baseUrl+'/facture/'+numFacture)
  }

  deleteImpaye(impayeId: number): Observable<void> {
   return  this.http.delete<void>(this.baseUrl+'/'+impayeId)
  }

}
