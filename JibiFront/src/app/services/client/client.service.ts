import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClientDto} from "../../entities/client-dto";
import {SessionService} from "../../components/utils/session/session.service"
import {environment} from "../../../environments/environment.development"
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,private  session: SessionService) { }

  private jsonHttpOptions: { headers: HttpHeaders } =   {
    headers: new HttpHeaders({}).set('Authorization', 'Bearer ' + this.session.getToken())
  };
  private apiUrl = environment.apiUrl;
  private agentId = this.session.getUser().id;

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/documents/upload`, formData);
  }

  saveClient(client: ClientDto): Observable<any> {
    console.log(this.session.getToken())
    console.log(this.agentId)
    return this.http.post<any>(`${this.apiUrl}/clients/${this.agentId}`, client,this.jsonHttpOptions);
  }

  getAgentClients(): Observable<any> {
    console.log(this.agentId)
    return this.http.get<any>(`${this.apiUrl}/clients/${this.agentId}`);
  }
}
