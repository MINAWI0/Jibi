import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {

  private formUrl = environment.apiUrl+'/api/formulaire';
  constructor(private http :  HttpClient) { }

  getFormulaire(type : string) : Observable<any>{
    return this.http.get<any>(`${this.formUrl}/${type}`);
  }
}
