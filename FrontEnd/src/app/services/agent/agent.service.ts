import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgentDto } from '../../entities/agent-dto';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/documents/upload`, formData);
  }

  saveAgent(agent: AgentDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agents`, agent);
  }
}
