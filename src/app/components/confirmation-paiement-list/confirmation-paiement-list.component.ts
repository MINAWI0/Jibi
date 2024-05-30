import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ConfirmationPaiementDto} from "../../entities/confirmation-paiement-dto";
import {ConfirmationPaiementService} from "../../services/client/confirmation-paiement.service";
import * as events from "events";

@Component({
  selector: 'app-confirmation-paiement-list',
  templateUrl: './confirmation-paiement-list.component.html',
  styleUrl :  './confirmation-paiement-list.component.css'

})
export class ConfirmationPaiementListComponent implements OnInit {
  confirmations: ConfirmationPaiementDto[] = [];
  comptePaiementId: string = '0612345678'; // Replace with actual comptePaiementId

  constructor(private confirmationPaiementService: ConfirmationPaiementService) {}

  ngOnInit(): void {
    this.getConfirmations();
  }

  getConfirmations(): void {
    this.confirmationPaiementService.getConfirmationsByComptePaiementId(this.comptePaiementId)
      .subscribe((data: ConfirmationPaiementDto[]) => {
        this.confirmations = data;
      });
  }


  protected readonly events = events;
}
