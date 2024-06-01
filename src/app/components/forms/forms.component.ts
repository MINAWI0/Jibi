import {Component, OnInit} from '@angular/core';
import {FormulaireService} from "../../services/formulaire/formulaire.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit{
    formFields: any[] = [];
    type !: string;
    formulaire!: FormGroup;

    constructor(private formService: FormulaireService,
                private formBuilder: FormBuilder) {
    }
    ngOnInit(): void {
        this.formulaire = this.formBuilder.group({});
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
}
