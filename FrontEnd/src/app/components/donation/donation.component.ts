import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent {
  donation: any;
  paymentConfirmed: boolean = false;

  constructor(private http: HttpClient) { }

  makeDonation() {
    // Récupérer les informations de la donation depuis l'utilisateur
    // ...

    // Envoyer la requête de donation au serveur
    this.http.post('/api/donation', this.donation).subscribe(
      (response) => {
        this.generatePdfReceipt();
      },
      (error) => {
        // Gérer l'erreur de donation
      }
    );
  }

  generatePdfReceipt() {
  }

  confirmPayment() {
    // Envoyer la requête de confirmation de paiement au serveur
    this.http.post('/api/donation/payment', { donationId: this.donation.id }).subscribe(
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
