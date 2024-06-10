import { Component, Input } from '@angular/core';
import {SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent {
  @Input() qrData: string = '';
  public qrCodeDownloadLink: SafeUrl = "";
  // elementType = NgxQrcodeElementTypes.URL;
  // correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '0698113157';

  constructor() { }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }
}
