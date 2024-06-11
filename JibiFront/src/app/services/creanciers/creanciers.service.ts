import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreancierDto} from "../../entities/creancier-dto";
import {CreanceDto} from "../../entities/creance-dto";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CreanciersService {

  private baseUrl = environment.apiUrl+'/api/creanciers';

  creances!: CreanceDto [];

  constructor(private http: HttpClient) { }

  countCreanciers(): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getCreditors(): Observable<CreancierDto[]>{
    return this.http.get<CreancierDto[]>(this.baseUrl);
  }

  getCreditorsByCategory(categorie: string):Observable<CreancierDto[]>{
    return this.http.get<CreancierDto[]>(`${this.baseUrl}/categorie/${categorie}`);
  }

  setCreances(creances:CreanceDto[]):void{
    console.log(creances)
    this.creances = creances;
  }

  getCreances():CreanceDto[]{
    return this.creances;
  }
}
