import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DonationDto} from "../../entities/donation-dto";
import {Observable} from "rxjs";
import {ConfirmationRequest} from "../../entities/confirmationRequest";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationPaymentService {
  private baseUrl = 'http://localhost:8080/api/confirmationPaiements';

  constructor(private http: HttpClient) { }

  confirmPayment(confirmationRequest: ConfirmationRequest): Observable<any> {
    return this.http.post<any>(this.baseUrl,confirmationRequest);
  }
}
