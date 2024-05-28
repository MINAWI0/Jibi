// src/app/components/create-client/create-client.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client/client.service';
import { ClientDto } from '../../entities/client-dto';
import { Router } from '@angular/router';
import { DocumentDto } from '../../entities/document-dto';
import {ClientType} from "../../entities/enums/client-type";

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  clientForm: FormGroup;
  selectedFile: File | null = null;
  clientTypes = ClientType;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', Validators.required],
      clientType: ['', Validators.required],
      documents: [[]],
      description: [''], // Added description field
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      password: ['bbbb'],
      firstLogin: [true]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const formData = new FormData();
      const client: ClientDto = this.clientForm.value;

      if (this.selectedFile) {
        // Append the file and description to the formData
        formData.append('file', this.selectedFile);
        formData.append('description', this.clientForm.get('description')?.value || '');

        this.clientService.uploadDocument(formData).subscribe(
          response => {
            // Update the document URL in the client's documents
            const documentDto: DocumentDto = { docUrl: response.docUrl, description: this.clientForm.get('description')?.value || '' };
            client.documents.push(documentDto);
            console.log("document part done!!!");
            // Save the client with the updated documents
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
        // Handle the case where no file is selected
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
    }
  }


}
