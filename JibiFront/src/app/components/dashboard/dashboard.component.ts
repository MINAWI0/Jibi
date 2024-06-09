import {Component, ViewEncapsulation} from '@angular/core';
import {ConfirmationPaiementDto} from "../../entities/confirmation-paiement-dto";
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {ConfirmationPaiementService} from "../../services/client/confirmation-paiement.service";
import {CompteService} from "../../services/compte/compte.service";
import {ChartLineStyleDemoComponent} from "../chart-line-style-demo/chart-line-style-demo.component";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'], // Correct property name is styleUrls, and it should be an array
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule , ChartLineStyleDemoComponent],
  providers: [ConfirmationPaiementService] ,
  encapsulation: ViewEncapsulation.None

})
export class DashboardComponent {
  confirmations: ConfirmationPaiementDto[] = [];
  responsiveOptions: any[] | undefined;

  constructor(
    private confirmationPaiementService: ConfirmationPaiementService ,
    private compteService: CompteService


  ) {}


  ngOnInit() {
    this.confirmationPaiementService.getConfirmationsByComptePaiementId().subscribe((confirmations) => {
      // Filter confirmations for today
      this.confirmations = confirmations.filter(confirmation => this.isToday(new Date(confirmation.date)));
      console.log(confirmations);
      // Sort confirmations by date
      this.confirmations.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }


  getSeverity(status: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined; // or another valid type if needed
    }
  }
  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

}
