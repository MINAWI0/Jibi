import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private stripePublicKey: string = environment.stripe.publicKey;

  constructor() {}

  payBill(creancierId: number, factureId: number, impayes: any, otp: string) {
    // Call CMI web service to pay bill
    const paymentData = {
      creancierId,
      factureId,
      impayes,
      otp
    };
    // Implement payment logic using CMI web service
  }
}
