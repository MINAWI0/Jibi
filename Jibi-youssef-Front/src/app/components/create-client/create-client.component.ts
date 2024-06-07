// src/app/components/create-client/create-client.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client/client.service';
import { ClientDto } from '../../entities/client-dto';
import { Router } from '@angular/router';
import { DocumentDto } from '../../entities/document-dto';
import {ClientType} from "../../entities/enums/client-type";
import {FormService} from "../utils/form/form.service"
import {FilestoreService} from "../utils/cloudinary/filestore.service"
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  clientForm: FormGroup;
  docForm: FormGroup;
  selectedFile: File | null = null;
  clientTypes = ClientType;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private formService: FormService,
    private fileStore: FilestoreService,
  ) {
    this.clientForm = this.formService.clientForm
    this.docForm = this.formService.docuForm
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const formData = new FormData();
      const client: ClientDto = this.clientForm.value;
      console.log(client.clientType);

      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
        formData.append('description', this.docForm.get('description')?.value || '');

        this.fileStore.uploadFile(this.selectedFile).subscribe(
          response => {
            const documentDto: DocumentDto = { docUrl: response, description: this.docForm.get('description')?.value || '' };
            client.documents.push(documentDto);

            this.clientService.saveClient(client).subscribe(
              res => {
                this.router.navigate(['/success-signup']);
                console.log('Client created successfully:', res);
              },
              error => {
                console.error('Error creating client:', error);
              }
            );
          },
          error => {
            console.error('Error uploading document:', error);
          }
        );
      } else {
        this.clientService.saveClient(client).subscribe(
          response => {
            this.router.navigate(['/success-signup']);
            console.log('Client created successfully:', response);
          },
          error => {
            console.error('Error creating client:', error);
          }
        );
      }
    } else {
      this.clientForm.markAllAsTouched();
    }
  }
}
