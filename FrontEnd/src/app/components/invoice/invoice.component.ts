import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  }

}
interface Invoice {
  id: number;
  customer: string;
  amount: number;
  dueDate: string;
}
