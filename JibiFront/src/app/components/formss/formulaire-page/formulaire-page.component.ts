import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {FormulaireService} from "../../../services/formulaire/formulaire.service";
import {CompteService} from "../../../services/compte/compte.service";
import {ConfirmationPaymentService} from "../../../services/confirmationPayment/confirmation-payment.service";
import {ImpayesServiceService} from "../../../services/impayesService/impayes-service.service";
import {AlertService} from "../../utils/alert/alert.service";
import {ClientPageComponent} from "../../../pages/client-page/client-page.component";
import {ConfirmationPaiementDto} from "../../../entities/confirmation-paiement-dto";
import {SessionService} from "../../utils/session/session.service";
import {ParseError} from "@angular/compiler";
import {ConfirmationRequest} from "../../../entities/confirmationRequest";


@Component({
  selector: 'app-formulaire-page',
  templateUrl: './formulaire-page.component.html',
  styleUrl: './formulaire-page.component.css'
})
export class FormulairePageComponent {
  formFields: any[] = [];
  formulaire!: FormGroup;
  type!: string;
  confirmationRequest!: ConfirmationRequest;

  selectedOption: { [key: string]: string } = {};
  @Input() data: any;

  constructor(
      private route: ActivatedRoute,
      private formService: FormulaireService,
      private formBuilder: FormBuilder,
      private compte: CompteService,
      private alertService: AlertService,
      private impayeService: ImpayesServiceService,
      protected clientPage: ClientPageComponent,
      private confirmationPaymentService: ConfirmationPaymentService,
      private sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    this.type=this.data.data
    this.loadFormulaire(this.type);

    this.formulaire = this.formBuilder.group({});
  }

  loadFormulaire(type: string): void {
    this.formService.getFormulaire(type).subscribe(data => {
      this.formFields = data.champs;
      this.buildForm();
      console.log(this.formFields);
    });
  }

  buildForm(): void {
    this.formFields.forEach(field => {
      this.formulaire.addControl(field.nom, this.formBuilder.control(''));
    });
  }

  selectOption(field: string, option: string): void {
    this.selectedOption[field] = option;
    console.log(field)
    this.formulaire.get(field)?.setValue(option);
  }

  onSubmit(): void {
    if(this.type=="donation"){
      var montantInput = this.formulaire.get("montant")?.value;
      var montantNumber = parseInt(montantInput);
      this.confirmationRequest = {
        montant: montantNumber,
        compteId: this.sessionService.getComptePayment().id,
        creanceId: this.data.creanceId.id,
        date: new Date()
      }
      console.log(this.confirmationRequest)
      this.confirmationPaymentService.confirmPayment(
        this.confirmationRequest
      ).subscribe(
        (donation: ConfirmationPaiementDto )=>{
          this.clientPage.loadComponent('invoice',
            {
              data: {
                titre: 'Donation ',
                invoiceNumber: donation.id,
                invoiceDate: donation.date,
                sender: {
                  name: this.formulaire.get("nomDonateur")?.value,
                  address: 'unité II, hay Mohammadi, Daoudiate',
                  email: ''
                },
                paymentInfo: {
                  companyName: donation.creance.creancier.nom,
                  address: 'Bd Mohamed VI, Marrakech 40000',
                  email: ''
                },
                Transaction: {
                  type: 'Paiment de Don',
                  date: donation.date,
                  number: donation.id,
                  paymentMethodType: 'Solde Jibi',
                  paymentMethodNumber: this.sessionService.getUser().phone,
                  amount: donation.montant,
                },
                logoUrl: donation.creance.creancier.logoURL
              }
            });
        },
        error => this.alertService.showWarning(error.message.error)
      )
    }else if (this.type=="recharge") {
      console.log("rech")
    }
    else {
      console.log("facture")
      this.impayeService.getImpayeByFacture(this.formulaire.get("numFacture")?.value).subscribe(
        impaye =>{
          if (impaye.length== 0){
            this.alertService.showWarning("Vous n'avez aucun Impayé")
          }else {
            this.clientPage.loadComponent('impayes',{data: impaye})
          }
        }

      )
    }

  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
