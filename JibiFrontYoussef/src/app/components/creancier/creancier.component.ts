import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CreanceDto} from "../../entities/creance-dto";
import {CreanceService} from "../../services/creance/creance.service";

@Component({
  selector: 'app-creancier',
  templateUrl: './creancier.component.html',
  styleUrl: './creancier.component.css'
})
export class CreancierComponent implements OnInit{
  id!: number;
  creances!: CreanceDto[];

  constructor(private route: ActivatedRoute, private creanceService: CreanceService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['creancierId'];
      this.creanceService.getCreancesByCreancierId(this.id).subscribe(creances => {
        this.creances = creances;
      });
    });
  }

}
