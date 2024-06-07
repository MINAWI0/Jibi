import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../../services/agent/agent.service';
import { AgentDto } from '../../entities/agent-dto';
import { Router } from '@angular/router';
import {DocumentDto} from "../../entities/document-dto";
import {AlertService} from "../utils/alert/alert.service";
import {FormService} from "../utils/form/form.service"
import {FilestoreService} from "../utils/cloudinary/filestore.service"

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.css'],
})
export class CreateAgentComponent implements OnInit {
  agentForm: FormGroup;
  docForm: FormGroup;
  selectedFile: File | null = null;
  pdfUrl!: SafeResourceUrl;
  constructor(
    private agentService: AgentService,
    private router: Router,
    private formService: FormService,
    protected alertService: AlertService,
    private fileStore: FilestoreService,
    private sanitizer: DomSanitizer
  ) {
    this.agentForm = this.formService.agentForm;
    this.docForm = this.formService.docuForm;
  }

  ngOnInit() {

  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
      if (this.agentForm.valid && this.docForm.valid) {
      const formData = new FormData();
      const agent: AgentDto = this.agentForm.value;

      if (this.selectedFile) {
        // Append the file and description to the formData
        formData.append('file', this.selectedFile);
        formData.append('description', this.docForm.get('description')?.value || '');

        this.fileStore.uploadFile(this.selectedFile).subscribe(response =>
        {
            // Update the document URL in the agent's documents
            const documentDto: DocumentDto = { docUrl: response, description: this.agentForm.get('description')?.value || '' };
            agent.documents.push(documentDto);
        console.log("document part done!!!");
            // Save the agent with the updated documents
            this.agentService.saveAgent(agent).subscribe(
              res => {
                this.alertService.showSuccess('Agent created successfully');
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
    }else {
      this.agentForm.markAllAsTouched();
    }
  }

  nextTab() {
    if (this.agentForm.valid) {
      const profileTab = document.getElementById('doc-tab');
      if (profileTab) {
        profileTab.click();
      }
    }else {
      this.agentForm.markAllAsTouched();
    }

  }
}
