import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['../../../assets/css/style.css']
})
export class InvoiceComponent implements OnInit{
  @ViewChild('downloadSection') downloadSection!: ElementRef;
  invoiceNumber: string = '';
  invoiceData: any
  @Input() data: any;
  ngOnInit() {
      this.invoiceData = this.data.data
      this.generateInvoiceNumber()
  }

  generateInvoiceNumber() {
    const randomPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    this.invoiceNumber = `INV-${Date.now()}-${randomPart}`;
  }

  downloadPDF() {
    const downloadSection = this.downloadSection.nativeElement;
    const invoiceNumber = this.invoiceNumber;
    const cWidth = downloadSection.clientWidth;
    const cHeight = downloadSection.clientHeight;
    const topLeftMargin = 0;
    const pdfWidth = cWidth + topLeftMargin * 2;
    const pdfHeight = pdfWidth * 1.5 + topLeftMargin * 2;
    const canvasImageWidth = cWidth;
    const canvasImageHeight = cHeight;
    const totalPDFPages = Math.ceil(cHeight / pdfHeight) - 1;

    html2canvas(downloadSection, { allowTaint: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 4.0);
      const pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
      pdf.addImage(
        imgData,
        'PNG',
        topLeftMargin,
        topLeftMargin,
        canvasImageWidth,
        canvasImageHeight
      );
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage();
        pdf.addImage(
          imgData,
          'PNG',
          topLeftMargin,
          -(pdfHeight * i) + topLeftMargin * 0,
          canvasImageWidth,
          canvasImageHeight
        );
      }
      pdf.save(`${invoiceNumber}.pdf`);
    });
  }

  th=['Transaction Type','Transaction Date','Transaction Number','Payment Method Type','Payment Method Number','Applied Amount']

  h() {
    console.log(this.invoiceData);
  }
}
