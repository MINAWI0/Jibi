import {Component, OnInit} from '@angular/core';
import {CreanciersService} from "../../services/creanciers/creanciers.service";

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.css'
})
export class StatistiqueComponent implements OnInit {

  creanciersNumber:number = 0;

  constructor(private crecierService: CreanciersService) {

  }

  getCreanciersNumber(){
    this.crecierService.countCreanciers().subscribe((number: number) =>
    this.creanciersNumber=number);
  }


  ngOnInit() {
    this.getCreanciersNumber();
  }

}
