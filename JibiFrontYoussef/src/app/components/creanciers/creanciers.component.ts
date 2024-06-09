import {Component, OnInit, ViewChild} from '@angular/core';
import {CreancierDto} from "../../entities/creancier-dto";
import {CreanciersService} from "../../services/creanciers/creanciers.service";
import {Router} from "@angular/router";
import {Categorie} from "../../entities/enums/Categorie";
import {ClientPageComponent} from "../../pages/client-page/client-page.component";
import {CreanceService} from "../../services/creance/creance.service";

@Component({
  selector: 'app-creditor',
  templateUrl: './creanciers.component.html',
  styleUrl: './creanciers.component.css'
})
export class CreanciersComponent implements OnInit {
  @ViewChild(ClientPageComponent) dynamicLoader!: ClientPageComponent;

  creditors! :CreancierDto[];
  categoriesKeys = Object.keys(Categorie) as Array<keyof typeof Categorie>;

  categorieMap = Categorie;



  constructor(
    private creanceService: CreanceService,
    private creditorService :CreanciersService,
    private router:Router,
    private clientPage: ClientPageComponent) {
  }
  ngOnInit(): void {
    this.getCreditors();
  }

  getCreditors (): void {
  this.creditorService.getCreditors().subscribe(creditors => {
    this.creditors = creditors;
  });

}

  onCategorieChange(event: any) {
    const selectedCategorie = event.target.value;
    console.log(selectedCategorie);
    this.getCreanciers(selectedCategorie);
  }

  getCreanciers(categorie: string) {
    this.creditorService.getCreditorsByCategory(categorie).subscribe(data => {
      this.creditors = data;
    });
  }

  sendCreances(creancierId: number):void{
    this.creanceService.getCreancesByCreancierId(creancierId).subscribe(
      creances=>{
        this.clientPage.loadComponent('creances',{creances: creances});
      }
    )


  }


}
