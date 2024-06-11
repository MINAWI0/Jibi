import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DonationDto} from "../../entities/donation-dto";
import {Observable} from "rxjs";
import {ConfirmationRequest} from "../../entities/confirmationRequest";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationPaymentService {
  private baseUrl = environment.apiUrl+'/api/confirmationPaiements';

  constructor(private http: HttpClient) { }

  confirmPayment(confirmationRequest: ConfirmationRequest): Observable<any> {
    return this.http.post<any>(this.baseUrl,confirmationRequest);
  }
}
