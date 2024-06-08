import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreancierDto} from "../../entities/creancier-dto";
import {CreanceDto} from "../../entities/creance-dto";

@Injectable({
  providedIn: 'root'
})
export class CreanciersService {

  private baseUrl = 'http://localhost:8080/cmi/creanciers';

  creances!: CreanceDto [];

  constructor(private http: HttpClient) { }

  getCreditors(): Observable<CreancierDto[]>{
    return this.http.get<CreancierDto[]>(this.baseUrl);
  }

  getCreditorsByCategory(categorie: string):Observable<CreancierDto[]>{
    return this.http.get<CreancierDto[]>(`${this.baseUrl}/${categorie}`);
  }
  setCreances(creances:CreanceDto[]):void{
    this.creances = creances;
  }
  getCreances():CreanceDto[]{
    return this.creances;
  }
}
