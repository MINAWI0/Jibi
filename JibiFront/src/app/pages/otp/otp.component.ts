import {Component, Inject, Input, ViewChild} from '@angular/core';
import {DialogService} from "../../components/utils/dialog/dialog.service";
import {AlertService} from "../../components/utils/alert/alert.service";
import {ConfirmationPaymentService} from "../../services/confirmationPayment/confirmation-payment.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ComptePaiementService} from "../../services/comptePaiement/compte-paiement.service";
import {CompteService} from "../../services/compte/compte.service";
import {ConfirmationPaiementDto} from "../../entities/confirmation-paiement-dto";
import {ClientPageComponent} from "../client-page/client-page.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ImpayesServiceService} from "../../services/impayesService/impayes-service.service";
import {MatTableDataSource} from "@angular/material/table";
import {SessionService} from "../../components/utils/session/session.service";

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
 otp: string;
  @ViewChild(ClientPageComponent) dynamicLoader!: ClientPageComponent;
  constructor(
    private impayeService: ImpayesServiceService,
    private clientPage: ClientPageComponent,
    private confirmationPaymentService: ConfirmationPaymentService,
    private comptePaimentService: ComptePaiementService,
    private compte: CompteService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogService: DialogService,
    private alertService: AlertService,
    private sessionService: SessionService,
    private route: Router,){
    this.otp = '';
  }
  handleSubmit = (event: Event) => {
    event.preventDefault();

    if(this.otp==this.data.data.otp)
      if (this.data.data.type=="recharge"){
        this.confirmationPaymentService.confirmPayment(
          this.data.data.confirmation
        ).subscribe(
          response => {
            this.alertService.showSuccessRecharge("Votre code de Recharge "+this.data.data.confirmation.montant +
              "DH est : "+this.generateInvoiceNumber())
            this.comptePaimentService.getComptePaiement(this.data.data.confirmation.compteId)
              .subscribe(
                comptePaiment => {
                  this.compte.setCompte(comptePaiment)
                }
              )
          },
          error => this.alertService.showError("Solde  Insuffisant !")
        )
      }else if (this.data.data.type=="donation"){
        this.confirmationPaymentService.confirmPayment(
          this.data.data.confirmation
        ).subscribe(
          (donation: ConfirmationPaiementDto )=>{
            this.dialogService.openOtpDialog({k: ''}).close()
            this.navigateToClient(donation)

            this.comptePaimentService.getComptePaiement(this.data.data.confirmation.compteId)
              .subscribe(
                comptePaiment => {
                  this.compte.setCompte(comptePaiment)
                }
              )
          },
          error => this.alertService.showWarning(error.message.error)
        )
      }else {

        this.confirmationPaymentService.confirmPayment(this.data.data.confirmation).subscribe(
          res =>{
            this.impayeService.deleteImpaye(this.data.data.impaye.id).subscribe(
              res =>{
                this.dialogService.openOtpDialog({k: ''}).close()
                const dto = {
                      titre: 'Facture : '+this.data.data.impaye.type,
                      invoiceNumber: this.data.data.impaye.facture.numFacture,
                      invoiceDate: this.data.data.impaye.date,
                      sender: {
                        name: this.sessionService.getUserInfos().nom + ' '
                          +
                          this.sessionService.getUserInfos().prenom,
                        address: 'unité II, hay Mohammadi, Daoudiate',
                        email: this.sessionService.getUser().email
                      },
                      paymentInfo: {
                        companyName: this.data.data.impaye.facture.creancier.nom,
                        address: 'Bd Mohamed VI, Marrakech 40000',
                        email: ''
                      },
                      Transaction: {
                        type: 'Paiment de '+ this.data.data.impaye.type,
                        date: this.data.data.impaye.date,
                        number: this.data.data.impaye.id,
                        paymentMethodType: 'Solde Jibi',
                        paymentMethodNumber: this.sessionService.getUser().phone,
                        amount: this.data.data.impaye.montant,
                      },
                      logoUrl: this.data.data.impaye.facture.creancier.logoURL
                    };
                const encodedDto = encodeURIComponent(JSON.stringify(dto));

                this.route.navigate(['/client', { dto: encodedDto }]);
              //  this.clientPage.loadComponent('impayes',{data: this.data.data.impaye})
              }
            )
            this.comptePaimentService.getComptePaiement(this.data.data.confirmation.compteId)
              .subscribe(
                comptePaiment => {
                  this.compte.setCompte(comptePaiment)
                }
              )
          },
          error => this.alertService.showError(error.error.message)
        )
      }

    else
      this.alertService.showError("Otp incorrect")

  }


  navigateToClient(donation: any) {
    const dto = {
      titre: 'Donation',
      invoiceNumber: donation.id,
      invoiceDate: donation.date,
      sender: {
        name: this.data.data.donateur,
        address: 'unité II, hay Mohammadi, Daoudiate',
        email: ''
      },
      paymentInfo: {
        companyName: donation.creance.creancier.nom,
        address: 'Bd Mohamed VI, Marrakech 40000',
        email: ''
      },
      transaction: {
        type: 'Paiment de Don',
        date: donation.date,
        number: donation.id,
        paymentMethodType: 'Solde Jibi',
        paymentMethodNumber: this.compte.getCompte().id,
        amount: donation.montant
      },
      logoUrl: donation.creance.creancier.logoURL
    };
    const encodedDto = encodeURIComponent(JSON.stringify(dto));

    this.route.navigate(['/client', { dto: encodedDto }]);
  }

  generateInvoiceNumber() {
    return Math.floor(Math.random() * 100000000000000).toString().padStart(14, '0');
  }

}
