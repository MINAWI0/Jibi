import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../../services/agent/agent.service';
import { AgentDto } from '../../entities/agent-dto';
import { Router } from '@angular/router';
import {DocumentDto} from "../../entities/document-dto";

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css']
})
export class CreateAgentComponent {
  agentForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private agentService: AgentService,
    private router: Router
  ) {
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
      description: [''], // Added description field
      documents: [[]],
      firstLogin: [true]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.agentForm.valid) {
      const formData = new FormData();
      const agent: AgentDto = this.agentForm.value;

      if (this.selectedFile) {
        // Append the file and description to the formData
        formData.append('file', this.selectedFile);
        formData.append('description', this.agentForm.get('description')?.value || '');

        this.agentService.uploadDocument(formData).subscribe(
          response => {
            // Update the document URL in the agent's documents
            const documentDto: DocumentDto = { docUrl: response.docUrl, description: this.agentForm.get('description')?.value || '' };
            agent.documents.push(documentDto);
        console.log("document part done!!!");
            // Save the agent with the updated documents
            this.agentService.saveAgent(agent).subscribe(
              res => {
                this.router.navigate(['/success-signup']);
                console.log('Agent created successfully:', res);
              },
              error => {
                console.error('Error creating agent:', error);
              }
            );
          },
          error => {
            console.error('Error uploading document:', error);
          }
        );
      } else {
        // Handle the case where no file is selected
        this.agentService.saveAgent(agent).subscribe(
          response => {
            this.router.navigate(['/success-signup']);
            console.log('Agent created successfully:', response);
          },
          error => {
            console.error('Error creating agent:', error);
          }
        );
      }
    }
  }

  nextTab() {
    const profileTab = document.getElementById('profile-tab');
    if (profileTab) {
      profileTab.click();
    }
  }
}
