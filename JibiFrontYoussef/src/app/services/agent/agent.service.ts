import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgentDto } from '../../entities/agent-dto';
import {SessionService} from "../../components/utils/session/session.service"
import {environment} from "../../../environments/environment.development"
@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl =  environment.apiUrl;
  private jsonHttpOptions: { headers: HttpHeaders } =   {
    headers: new HttpHeaders({}).set('Authorization', 'Bearer ' + this.session.getToken())
  };

  constructor(private http: HttpClient,private session: SessionService) { }

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/documents/upload`, formData);
  }

  saveAgent(agent: AgentDto): Observable<any> {
    console.log(this.session.getToken())
    return this.http.post<any>(`${this.apiUrl}/agents`, agent, this.jsonHttpOptions);
  }
}
