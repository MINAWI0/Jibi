import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComptePaiementService } from '../../services/comptePaiement/compte-paiement.service';
import { CompteService } from '../../services/compte/compte.service';
import {AlertService} from "../utils/alert/alert.service";

@Component({
  selector: 'app-recharge-solde',
  templateUrl: './recharge-solde.component.html',
  styleUrls: ['./recharge-solde.component.css']
})
export class RechargeSoldeComponent {
  rechargeForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private comptePaiementService: ComptePaiementService,
    private compteService: CompteService,
    private alertService: AlertService,
  ) {
    this.rechargeForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.rechargeForm.invalid) {
      this.rechargeForm.markAllAsTouched();
      return;
    }

    const amount = this.rechargeForm.value.amount;
    const currentCompte = this.compteService.getCompte();

    if (currentCompte) {
      const currentCompteId = currentCompte.id;
      this.comptePaiementService.rechargeSolde(currentCompteId, amount).subscribe(
        (response: any) => {
          this.successMessage = 'Recharge avec réussie!';
          this.alertService.showSuccess(this.successMessage);
          // Recharge successful

          this.errorMessage = '';
          this.compteService.setCompte(response);
          this.rechargeForm.reset();
        },
        error => {
          console.error('Recharge failed', error);
          this.successMessage = '';
          this.errorMessage = 'Recharge échouée. Veuillez réessayer.';
          this.alertService.showWarning(this.errorMessage)
        }
      );
    } else {
      this.errorMessage = 'Compte non trouvé.';
      this.alertService.showWarning(this.errorMessage)
    }
  }
}
