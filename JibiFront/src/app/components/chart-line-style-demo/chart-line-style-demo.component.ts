import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ConfirmationPaiementService } from '../../services/client/confirmation-paiement.service';
import { ConfirmationPaiementDto } from '../../entities/confirmation-paiement-dto';
import { CompteService } from "../../services/compte/compte.service";

@Component({
  selector: 'chart-line-style-demo',
  templateUrl: './chart-line-style-demo.component.html',
  standalone: true,
  imports: [ChartModule]
})
export class ChartLineStyleDemoComponent implements OnInit {
  data: any;
  options: any;
  searchTerm: string = '';


  private confirmations: ConfirmationPaiementDto[] = []; // Step 1: Store the confirmations here

  constructor(
      private confirmationPaiementService: ConfirmationPaiementService,
      private compteService: CompteService
  ) {}

  ngOnInit() {
    this.confirmationPaiementService.getConfirmationsByComptePaiementId().subscribe(
      (confirmations: ConfirmationPaiementDto[]) => {
        this.confirmations = confirmations;

        // Use the new method to aggregate data
        const aggregatedData = this.aggregateDetailsByDate(confirmations);

        const labels = Array.from(aggregatedData.keys());
        const amounts = Array.from(aggregatedData.values()).map(data => data.totalAmount);

        this.data = {
          labels: labels,
          datasets: [
            {
              label: 'Confirmation Amounts',
              data: amounts,
              fill: true,
              borderColor: 'rgb(249, 115, 22)',
              tension: 0.4,
              backgroundColor: 'rgba(255, 167, 38, 0.2)',
              pointRadius: 10,
              pointBackgroundColor: 'rgb(59, 130, 246)',
              pointBorderColor: 'rgb(239, 68, 68)'
            }
          ]
        };

        this.setupChartOptions();
      }
    );
  }
  aggregateDetailsByDate(confirmations: ConfirmationPaiementDto[]): Map<string, { totalAmount: number, details: string[] }> {
    const aggregationMap = new Map<string, { totalAmount: number, details: string[] }>();

    for (const confirmation of confirmations) {
      const dateStr = new Date(confirmation.date).toLocaleDateString();
      const entry = aggregationMap.get(dateStr) || { totalAmount: 0, details: [] };

      // Update the total amount and append the new detail
      entry.totalAmount += confirmation.montant;
      entry.details.push(`${confirmation.creance.creancier.nom}: ${confirmation.montant.toFixed(2)}`);

      // Set the updated entry back into the map
      aggregationMap.set(dateStr, entry);
    }

    // Convert the map to an array of keys (dates), sort it, and then recreate the map
    return new Map([...Array.from(aggregationMap.entries())].sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()));
  }
  setupChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');

    this.options = {
      responsive: true,
      animation: {
        duration: 0,
      },
      hover: {
        animationDuration: 0,
      },
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          displayColors: false,
          bodyFont: {
            size: 14,
          },
          callbacks: {
            title: (context: any) => '',
            label: (context: any) => {
              const dateStr = this.data.labels[context.dataIndex];
              const aggregation = this.aggregateDetailsByDate(this.confirmations).get(dateStr);

              if (aggregation) {
                return [
                  `Date: ${dateStr}`,
                  `Total Amount: ${aggregation.totalAmount.toFixed(2)}`,
                  'Details:',
                  ...aggregation.details
                ];
              }

              return [`Date: ${dateStr}`, `Total Amount: ${this.data.datasets[0].data[context.dataIndex].toFixed(2)}`];
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            display: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            display: false
          }
        }
      }
    };
  }
}


