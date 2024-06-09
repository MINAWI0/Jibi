import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {

  private formUrl = 'http://localhost:8080/api/formulaire';
  constructor(private http :  HttpClient) { }

  getFormulaire(type : string) : Observable<any>{
    return this.http.get<any>(`${this.formUrl}/${type}`);
  }
}
