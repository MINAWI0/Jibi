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

    creanceType = [
      {name: '',logoUrl: '',id: 0},
    ]


    constructor(private formService: FormulaireService,
                private formBuilder: FormBuilder,
                private creanceService: CreanceService,
                protected clientPage: ClientPageComponent) {
    }

    ngOnInit(): void {

      this.data.creances.map((creance: CreanceDto) => this.creanceService.getCreance(creance.id).subscribe(
        res =>{
          if ("nomDonateur" in res)
            this.creanceType.push({name: "Donation",logoUrl: res.creancier.logoURL,id: res.creancier.id});
          else if("numFacture" in res)
            this.creanceType.push({name: "Facture",logoUrl: res.creancier.logoURL,id: res.creancier.id});
          else
            this.creanceType.push({name: "Recharge",logoUrl: res.creancier.logoURL,id: res.creancier.id});
        }

      ) )

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
