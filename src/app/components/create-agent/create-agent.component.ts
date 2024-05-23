import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../../services/agent/agent.service';
import {AgentDto} from "../../entities/agent-dto";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css']
})
export class CreateAgentComponent {
  agentForm: FormGroup;

  constructor(private fb: FormBuilder,
              private agentService: AgentService,
              private router: Router) {
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
      firstLogin: [true]
    });
  }

  onSubmit() {
    if (this.agentForm.valid) {
      const agent: AgentDto = this.agentForm.value;
      this.agentService.saveAgent(agent).subscribe(
        response => {
          this.router.navigate(['/success-signup']);
          console.log('Agent created successfully:', response);
          console.log(response);
          // Handle successful creation, e.g., navigate to another page or show a success message
        },
        error => {
          console.error('Error creating agent:', error);
          // Handle error, e.g., show an error message
        }
      );
    }
  }

  nextTab() {
    const profileTab = document.getElementById('profile-tab');
    if (profileTab) {
      profileTab.click();
    }
  }
}
