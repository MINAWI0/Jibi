import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CreanceService } from '../../services/creance/creance.service';
import { CreanceDto } from '../../entities/creance-dto';
import { DonationDto } from '../../entities/donation-dto';
import { FactureDto } from '../../entities/facture-dto';
import { RechargeDto } from '../../entities/recharge-dto';

@Component({
  selector: 'app-creance',
  templateUrl: './creance.component.html',
  styleUrls: ['./creance.component.css']
})
export class CreanceComponent implements OnInit {
  creance: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private creanceService: CreanceService
  ) {}

  ngOnInit(): void {
    const creanceId = Number(this.route.snapshot.paramMap.get('creanceId'));
    console.log('Creance ID:', creanceId);

    this.creanceService.getCreance(creanceId).subscribe(
      (creance: CreanceDto) => {
        this.creance = creance;

        if ('nomDonateur' in creance) {
          this.router.navigate(['donation'], { queryParams: { creanceId: creanceId } });
        } else if ('numFacture' in creance) {
          this.router.navigate(['facture'], { queryParams: { creanceId: creanceId }});
        } else if ('montant' in creance) {
          this.router.navigate(['recharge'], { queryParams: { creanceId: creanceId } });
        }
      },
      (error) => {
        console.error('Error fetching creance:', error);
      }
    );
  }
}
