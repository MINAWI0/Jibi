import { Component, EventEmitter, Output } from '@angular/core';
import {
  NgxScannerQrcodeService,
  ScannerQRCodeConfig,
  ScannerQRCodeSelectedFiles
} from "ngx-scanner-qrcode";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ComptePaiementService } from "../../services/comptePaiement/compte-paiement.service";
import {CompteService} from "../../services/compte/compte.service";

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.css']
})
export class QrCodeScannerComponent {
  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  transferForm: FormGroup;
  scannedAccountId: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  accountAmmount: number = -1;
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private qrcode: NgxScannerQrcodeService,
    private comptePaiementService: ComptePaiementService,
    private compteService: CompteService
  ) {
    this.transferForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]]
    });
    this.accountAmmount = this.compteService.getCompte().solde;
  }

  public onSelects(files: any) {
    this.qrcode.loadFiles(files).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      this.qrCodeResult = res;
    });
  }

  onSubmit() {
    if (this.transferForm.valid && this.transferForm.get('amount')?.value <= this.accountAmmount) {


    const { amount } = this.transferForm.value;
    const transferRequest = {
      fromAccount: this.compteService.getCompte().id,
      toAccount: this.scannedAccountId,
      amount: amount
    };

    this.comptePaiementService.transferSolde(transferRequest).subscribe(
      (response: any) => {
        console.log('Transfer successful', response);
        // const transferResponse = JSON.parse(response);
        this.compteService.setCompte(response);
        this.successMessage = 'Transfert réussi!';
        this.errorMessage = '';
      },
      error => {
        console.error('Transfer failed', error);
        this.errorMessage = 'Transfert échoué, veuillez réessayer!';
        this.successMessage = '';
      }
    );}else {
      this.transferForm.markAllAsTouched();
    }
  }

  handleQrCodeResult(result: string) {
    this.scannedAccountId = result;
    console.log('Scanned account ID:', this.scannedAccountId);
  }

}
