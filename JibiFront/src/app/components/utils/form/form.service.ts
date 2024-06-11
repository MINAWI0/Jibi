import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {cinPasseportValidator, dateNaissanceValidator, numTelValidator} from './validators/custom-validators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  agentForm: FormGroup;
  docuForm: FormGroup;
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    //Agent Form
    this.agentForm = this.fb.group({
      cin: ['', [Validators.required, cinPasseportValidator()]],
      passeport: ['', cinPasseportValidator()],
      dateNaissance: ['', [dateNaissanceValidator()]],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', [Validators.required, numTelValidator()]],
      numCommerce: ['', Validators.required],
      numPatente: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      password: [''],
      documents: [[]],
      firstLogin: [true]
    });
    //Doc Form
    this.docuForm = this.fb.group(
      {
        description: [''],
      })
    //Client Form
    this.clientForm = this.fb.group({
      email: ['', [ Validators.email]],
      numTel: ['', [Validators.required, numTelValidator()]],
      clientType: ['', Validators.required],
      documents: [[]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      password: ['bbbb'],
      firstLogin: [true]
    });
  }
}
