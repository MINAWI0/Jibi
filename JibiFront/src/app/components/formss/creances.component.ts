import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormulaireService} from "../../services/formulaire/formulaire.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreanceService} from "../../services/creance/creance.service";
import {CreanciersService} from "../../services/creanciers/creanciers.service";
import {CreanceDto} from "../../entities/creance-dto";
import {ClientPageComponent} from "../../pages/client-page/client-page.component";

@Component({
  selector: 'app-forms',
  templateUrl: './creances.component.html',
  styleUrl: './creances.component.css'
})
export class CreancesComponent implements OnInit{
    formFields: any[] = [];
    type !: string;
    formulaire!: FormGroup;

    @ViewChild(ClientPageComponent) dynamicLoader!: ClientPageComponent;
    @Input() data: any;

    creanceType = [ { name: '', logoUrl: '', id: 0 }]



    constructor(private formService: FormulaireService,
                private formBuilder: FormBuilder,
                private creanceService: CreanceService,
                protected clientPage: ClientPageComponent) {
    }

    contains(name: string): boolean {
      return this.creanceType.some((element) => element.name === name);
    }

    ngOnInit(): void {
      let creanceTypesAdded: { [key: string]: boolean } = {};
      this.data.creances.forEach((creance: CreanceDto) => {
        this.creanceService.getCreance(creance.id).subscribe((res) => {
          let creanceType = { name: '', logoUrl: '', id: 0 };

          if ("nomDonateur" in res) {
            creanceType.name = "Donation";
            creanceType.logoUrl='https://res.cloudinary.com/dlkvn0fpz/image/upload/v1718082628/pfsfiles/o1xvw9tkdzwa6nd3hygm.jpg'
          } else if ("numFacture" in res) {
            creanceType.name = "Facture";
            creanceType.logoUrl='https://res.cloudinary.com/dlkvn0fpz/image/upload/v1718082311/pfsfiles/mjhrgrfhhrcvvjhpqz83.jpg'
          } else {
            creanceType.name = "Recharge";
            creanceType.logoUrl='https://res.cloudinary.com/dlkvn0fpz/image/upload/v1718082319/pfsfiles/umqwsuh6t6omtdh1rq2j.jpg'
          }

          creanceType.id = creance.id;

          if (!this.contains(creanceType.name)) {
            this.creanceType.push(creanceType);
            creanceTypesAdded[creanceType.name] = true;
          }
        });
      });

      console.log(this.creanceType)


        this.formulaire = this.formBuilder.group({
            email: ['', [Validators.required, this.emailValidator]]
        });
    }

    loadFormulaire(type: string): void {
        this.formService.getFormulaire(type).subscribe(
            data => {
                this.type = type;
                this.formFields = data.champs;
                this.buildForm();
                console.log(this.formFields);
            }
        )
    }

    buildForm(): void {
        this.formFields.forEach(field => {
            this.formulaire.addControl(field.nom, this.formBuilder.control(''));
        });
    }
    onSubmit(): void {
        console.log(this.formulaire.value);
    }
    emailValidator(control: FormControl) {
        const email = control.value;
        if (email && email.indexOf('@') === -1) {
            return { invalidEmail: true };
        }
        return null;
    }
}
