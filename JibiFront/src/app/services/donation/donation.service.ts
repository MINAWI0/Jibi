import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Observable} from "rxjs";
import {DonationDto} from "../../entities/donation-dto";

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private baseUrl = 'http://localhost:8080/api/donations';

  constructor(private http: HttpClient) { }

  saveDonation(donation: DonationDto): Observable<any> {
    return this.http.post<any>(this.baseUrl,donation);
  }

}
