import {Component, OnInit} from '@angular/core';
import {CreancierDto} from "../../entities/creancier-dto";
import {CreanciersService} from "../../services/creanciers/creanciers.service";
import {Categorie} from "../../entities/enums/categorie";
import {CreanceDto} from "../../entities/creance-dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-creditor',
  templateUrl: './creanciers.component.html',
  styleUrl: './creanciers.component.css'
})
export class CreanciersComponent implements OnInit {
  creditors! :CreancierDto[];
  categoriesKeys = Object.keys(Categorie) as Array<keyof typeof Categorie>;

  categorieMap = Categorie;

  constructor(private creditorService :CreanciersService, private router:Router) {
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

  sendCreances(creances: CreanceDto[]):void{
    this.creditorService.setCreances(creances);
    this.router.navigate(['/creances']);
  }


}
