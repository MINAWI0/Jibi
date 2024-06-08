import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreancierDto} from "../../entities/creancier-dto";

@Injectable({
  providedIn: 'root'
})
export class CreancierService {
  private baseUrl = 'http://localhost:8080/api/creanciers';

  constructor(private http: HttpClient) { }


  getAllCreanciers(): Observable<CreancierDto[]> {
    return this.http.get<CreancierDto[]>(this.baseUrl);
  }

  getCreancier(id: string): Observable<CreancierDto> {
    return this.http.get<CreancierDto>(`${this.baseUrl}/${id}`);
  }

}
