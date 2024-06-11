import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ImpayeDto} from "../../entities/ImpayeDto";
import {environment} from "../../../environments/environment.development";
import {Sms} from "../../entities/sms";
import {otpTokenDto} from "../../entities/otpTokenDto";

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private baseUrl = environment.apiUrl+'/api/sms';

  constructor(private http: HttpClient) { }

  sendOTp(otp: Sms): Observable<otpTokenDto>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(otp);
    return this.http.post<otpTokenDto>(this.baseUrl,otp,{headers})
  }

  verifyOtp(otpToken: otpTokenDto): Observable<boolean>{
    return this.http.post<boolean>(this.baseUrl+'/verify',otpToken)
  }

}
