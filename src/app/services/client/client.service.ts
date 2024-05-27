import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClientDto} from "../../entities/client-dto";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/documents/upload`, formData);
  }

  saveClient(client: ClientDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/clients`, client);
  }
}
