import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [CurrencyPipe, DatePipe]
})
export class InvoiceComponent implements OnInit{
  invoice: any;
  paymentConfirmed: boolean = false;
  invoices!: Invoice[];
  constructor(
    private http: HttpClient,private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    this.http.get<Invoice[]>('./assets/data/invoices.json').subscribe(
      (data) => {
        this.invoices = data;
        this.generatePdfReceipt();
      },
      (error) => {
        // Gérer l'erreur de récupération des factures
      }
    );
  }


  generatePdfReceipt(): jsPDF {
    const doc = new jsPDF();
    const invoice = this.invoices[0];

    const docDefinition = [
      { text: 'Reçu de paiement', style: 'header' },
      { text: `Facture #${invoice.id}`, style: 'subheader' },
      { text: `Client : ${invoice.customer}`, margin: [0, 10, 0, 0] },
      { text: `Montant : ${this.currencyPipe.transform(invoice.amount)}`, margin: [0, 5, 0, 0] },
      { text: `Date d'échéance : ${this.datePipe.transform(invoice.dueDate, 'yyyy-MM-dd')}`, margin: [0, 5, 0, 0] }
    ].map(item => item.text);

    doc.setFontSize(12);
    doc.text(docDefinition, 20, 20);

    return doc;
  }
  downloadReceipt() {
    const doc = this.generatePdfReceipt();
    doc.save('invoice.pdf');
  }
  confirmPayment() {
    // Envoyer la requête de confirmation de paiement au serveur
    this.http.post('/api/invoice/payment', { invoiceId: this.invoice.id }).subscribe(
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
interface Invoice {
  id: number;
  customer: string;
  amount: number;
  dueDate: string;
}
