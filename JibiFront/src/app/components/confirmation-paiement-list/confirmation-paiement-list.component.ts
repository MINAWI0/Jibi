import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ConfirmationPaiementDto} from "../../entities/confirmation-paiement-dto";
import {ConfirmationPaiementService} from "../../services/client/confirmation-paiement.service";
import * as events from "events";
import {CompteService} from "../../services/compte/compte.service";

@Component({
  selector: 'app-confirmation-paiement-list',
  templateUrl: './confirmation-paiement-list.component.html',
  styleUrl :  './confirmation-paiement-list.component.css'

})
export class ConfirmationPaiementListComponent implements OnInit {

  allConfirmations: ConfirmationPaiementDto[] = [];
  protected readonly events = events;
  searchTerm: string = '';
  sortByDate: 'recent' | 'oldest' = 'recent';

  confirmations: ConfirmationPaiementDto[] = [];// Replace with actual comptePaiementId


  constructor(
    private confirmationPaiementService: ConfirmationPaiementService ,
    private compteService: CompteService
  ) {}

  ngOnInit(): void {
    this.getConfirmations();
  }

  getConfirmations(): void {
    this.confirmationPaiementService.getConfirmationsByComptePaiementId()
      .subscribe((data: ConfirmationPaiementDto[]) => {
        this.allConfirmations = data;
        this.confirmations = data; // Initialize filtered list
        this.sortConfirmations();
        this.filterConfirmations();
      });
  }
  filterConfirmations() {
    if (!this.searchTerm) {
      this.confirmations = this.allConfirmations;
    } else {
      this.confirmations = this.allConfirmations.filter(confirmation =>
        confirmation.creance.creancier.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  onSortChange(): void {
    this.sortConfirmations();
    this.filterConfirmations();
  }
  sortConfirmations() {
    if (this.sortByDate === 'recent') {
      this.allConfirmations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      this.allConfirmations.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  }


}
