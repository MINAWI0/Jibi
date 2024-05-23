import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AgentDto} from "../../entities/agent-dto";

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private baseUrl = 'http://localhost:8080/api/agents'; // Assuming your backend API is served from this base URL

  constructor(private http: HttpClient) { }

  saveAgent(agentDto: AgentDto): Observable<AgentDto> {
    return this.http.post<AgentDto>(`${this.baseUrl}`, agentDto);
  }

  // You can add other methods here to interact with other endpoints of the AgentController if needed
}
