import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AgentService} from "../../../services/agent/agent.service";
import {Router} from "@angular/router";
import {AlertService} from "../alert/alert.service";
import {ClientType} from "../../../entities/enums/client-type";
import {ClientService} from "../../../services/client/client.service";

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
      cin: ['', Validators.required],
      passeport: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', Validators.required],
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
        description: ['', Validators.required],
      })
    //Client Form
    this.clientForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', Validators.required],
      clientType: [''],
      documents: [[]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      password: ['bbbb'],
      firstLogin: [true]
    });
  }
}
