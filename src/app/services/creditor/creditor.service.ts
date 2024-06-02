import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreancierDto} from "../../entities/creancier-dto";

@Injectable({
  providedIn: 'root'
})
export class CreditorService {

  private baseUrl = 'http://localhost:8080/cmi/creanciers';

  constructor(private http: HttpClient) { }

  getCreditors(): Observable<CreancierDto[]>{
    return this.http.get<CreancierDto[]>(this.baseUrl);
  }
}
