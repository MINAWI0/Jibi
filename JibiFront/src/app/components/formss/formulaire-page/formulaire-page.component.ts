import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {FormulaireService} from "../../../services/formulaire/formulaire.service";
import {CompteService} from "../../../services/compte/compte.service";
import {ConfirmationPaymentService} from "../../../services/confirmationPayment/confirmation-payment.service";


@Component({
  selector: 'app-formulaire-page',
  templateUrl: './formulaire-page.component.html',
  styleUrl: './formulaire-page.component.css'
})
export class FormulairePageComponent {
  formFields: any[] = [];
  formulaire!: FormGroup;
  type!: string;


  selectedOption: { [key: string]: string } = {};
  @Input() data: any;
  constructor(
      private route: ActivatedRoute,
      private formService: FormulaireService,
      private formBuilder: FormBuilder,
      private compte: CompteService,
      private confirmationPaymentService: ConfirmationPaymentService,
  ) {}

  ngOnInit(): void {
    this.type=this.data.data
    this.loadFormulaire(this.type);

    this.formulaire = this.formBuilder.group({});
  }

  loadFormulaire(type: string): void {
    this.formService.getFormulaire(type).subscribe(data => {
      this.formFields = data.champs;
      this.buildForm();
      console.log(this.formFields);
    });
  }

  buildForm(): void {
    this.formFields.forEach(field => {
      this.formulaire.addControl(field.nom, this.formBuilder.control(''));
    });
  }

  selectOption(field: string, option: string): void {
    this.selectedOption[field] = option;
    this.formulaire.get(field)?.setValue(option);
  }

  onSubmit(): void {
    console.log(this.type)
    if(this.type=="donation" || this.type == "recharge"){
      this.confirmationPaymentService.confirmPayment(
        {
          montant: this.formulaire.get("montant")?.value,
          compteId: this.compte.getCompte().id,
          creanceId: this.data.creanceId,
          date: new Date(),
        }
      ).subscribe(
        res => console.log(res),
        error => console.log(error.message.error)
      )
    }

  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
