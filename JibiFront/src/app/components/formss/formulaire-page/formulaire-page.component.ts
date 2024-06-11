import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormulaireService} from "../../../services/formulaire/formulaire.service";
import {CompteService} from "../../../services/compte/compte.service";
import {ConfirmationPaymentService} from "../../../services/confirmationPayment/confirmation-payment.service";
import {ImpayesServiceService} from "../../../services/impayesService/impayes-service.service";
import {AlertService} from "../../utils/alert/alert.service";
import {ClientPageComponent} from "../../../pages/client-page/client-page.component";
import {SessionService} from "../../utils/session/session.service";
import {ConfirmationRequest} from "../../../entities/confirmationRequest";
import {ComptePaiementService} from "../../../services/comptePaiement/compte-paiement.service";
import {DialogService} from "../../utils/dialog/dialog.service";
import {OtpService} from "../../../services/otp/otp.service";


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
      private comptePaimentService: ComptePaiementService,
      private formService: FormulaireService,
      private formBuilder: FormBuilder,
      private compte: CompteService,
      private alertService: AlertService,
      private impayeService: ImpayesServiceService,
      protected clientPage: ClientPageComponent,
      private dialogService: DialogService,
      private confirmationPaymentService: ConfirmationPaymentService,
      private sessionService: SessionService,
      private otpService: OtpService
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
  otp!: string;


  onSubmit(): void {
    if(this.type=="donation"){
      var montantInput = this.formulaire.get("montant")?.value;
      var montantNumber = parseInt(montantInput);
      this.confirmationRequest = {
        montant: montantNumber,
        compteId: this.sessionService.getComptePayment().id,
        creanceId: this.data.creanceId.id,
        date:  new Date()

      }
      this.otpService.sendOTp({destinationSMSNumber: this.compte.getCompte().id}).subscribe(
        otpToken=> {
          console.log(otpToken)
          this.dialogService.openOtpDialog(
            {confirmation: this.confirmationRequest,otp: otpToken.token, type: "donation",donateur: this.formulaire.get("nomDonateur")?.value})
        }
      )

    }else if (this.type=="recharge") {
      this.confirmationRequest = {
        montant: this.getRechargeValue(this.formulaire.get("montant")?.value) || 10,
        compteId: this.sessionService.getComptePayment().id,
        creanceId: this.data.creanceId.id,
        date:  new Date()
      }
      this.otpService.sendOTp({destinationSMSNumber: this.compte.getCompte().id}).subscribe(
        otpToken=> {
          console.log(otpToken)
          this.dialogService.openOtpDialog({confirmation: this.confirmationRequest,otp: otpToken.token, type: "recharge"})
        }
      )

    }
    else {
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

  getRechargeValue(value: string): number | null {
    if (value === 'RECHARGE_10DH') {
      return 10;
    } else if (value === 'RECHARGE_20DH') {
      return 20;
    } else if (value === 'RECHARGE_50DH') {
      return 50;
    } else if (value === 'RECHARGE_70DH') {
      return 70;
    } else if (value === 'RECHARGE_80DH') {
      return 80;
    } else if (value === 'RECHARGE_90DH') {
      return 90;
    } else if (value === 'RECHARGE_100DH') {
      return 100;
    } else {
      return null;
    }
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
