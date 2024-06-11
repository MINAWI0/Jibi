import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ImpayeDto} from "../../../entities/ImpayeDto";
import {ConfirmationPaymentService} from "../../../services/confirmationPayment/confirmation-payment.service";
import {ConfirmationRequest} from "../../../entities/confirmationRequest";
import {SessionService} from "../../utils/session/session.service";
import {ImpayesServiceService} from "../../../services/impayesService/impayes-service.service";
import {AlertService} from "../../utils/alert/alert.service";
import {ClientPageComponent} from "../../../pages/client-page/client-page.component";
import {ComptePaiementService} from "../../../services/comptePaiement/compte-paiement.service";
import {CompteService} from "../../../services/compte/compte.service";
import {OtpService} from "../../../services/otp/otp.service";
import {DialogService} from "../../utils/dialog/dialog.service";

@Component({
  selector: 'app-impayes',
  templateUrl: './impayes.component.html',
  styleUrl: './impayes.component.css'
})
export class ImpayesComponent implements OnInit{
  impayes = new MatTableDataSource<ImpayeDto>([]);
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @Input() data: any;
  cols = ['Numero de Facture', 'Date Facture', 'Type Facture','Montant', 'Action']
  confirmationRequest!: ConfirmationRequest;
  constructor(
    private confirmationPaymentService: ConfirmationPaymentService,
    private sessionService: SessionService,
    private impayeService: ImpayesServiceService,
    private alertService: AlertService,
    private clientPage: ClientPageComponent,
    private comptePaimentService: ComptePaiementService,
    private compte: CompteService,
    private dialogService: DialogService,
    private otpService: OtpService) {
  }
  ngOnInit() {
    this.getImpayes()
    this.sessionService.getUserInfos()
  }
  getImpayes(){
    this.impayes = new MatTableDataSource(this.data.data);
    this.impayes.sort = this.sort;
    this.impayes.paginator = this.paginator;
  }



  payer(impaye: ImpayeDto) {
    this.confirmationRequest={
      montant: impaye.montant,
      compteId: this.sessionService.getComptePayment().id,
      creanceId: impaye.facture.id,
      date: new Date()
    }
    this.otpService.sendOTp({destinationSMSNumber: this.compte.getCompte().id}).subscribe(
      otpToken=> {
        console.log(otpToken)
        this.dialogService.openOtpDialog(
          {confirmation: this.confirmationRequest, otp: otpToken.token, type: "facture",impaye: impaye}
        )
      })

  }
}
