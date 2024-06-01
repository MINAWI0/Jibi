import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent {
  rechargeCode: string;
  paymentConfirmed: boolean = false;

  constructor(private http: HttpClient) {
    this.rechargeCode = '';
  }
  initiateRecharge() {
    this.rechargeCode = uuidv4();
    // Afficher le code de recharge à l'utilisateur
  }

  confirmPayment() {
    // Envoyer la requête de confirmation de paiement au serveur
    this.http.post('/api/recharge', { code: this.rechargeCode }).subscribe(
      (response) => {
        this.paymentConfirmed = true;
        // Enregistrer la transaction et envoyer la confirmation à l'utilisateur
      },
      (error) => {
        // Gérer l'erreur de paiement
      }
    );
  }
}
