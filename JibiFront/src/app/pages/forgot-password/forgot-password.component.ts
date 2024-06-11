import { Component } from '@angular/core';
import {DialogService} from "../../components/utils/dialog/dialog.service";
import {AlertService} from "../../components/utils/alert/alert.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  phoneNumber: string;


  constructor(
    protected dialogService: DialogService,
    private alertService: AlertService,){
    this.phoneNumber = '+212 '; // Initializing properties
  }

  handleSubmit = (event: Event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    if(!this.phoneNumber.replace(/\s/g, '').match('^[0-9]{10}$')){
      this.alertService.showWarning('Invalid Phone Number'+this.phoneNumber);

    }

    console.log(this.phoneNumber.replace(/\s/g, ''));



  }

  formatPhoneNumber() {
    const prefix = '+212 ';
    // Remove any non-digit characters and limit to 9 digits after the prefix
    let digits = this.phoneNumber.replace(/\D/g, '').slice(3, 12); // Remove the +212 and limit to 9 digits
    // Format the digits into groups of two
    let formattedDigits = '';
    for (let i = 0; i < digits.length; i += 2) {
      if (i > 0) formattedDigits += ' ';
      formattedDigits += digits.slice(i, i + 2);
    }
    // Set the phone number with the prefix
    this.phoneNumber = prefix + formattedDigits;
  }

  preventPrefixRemoval(event: KeyboardEvent) {
    const prefix = '+212 ';
    // Prevent removal of the prefix
    if (this.phoneNumber.startsWith(prefix) && this.phoneNumber.length <= prefix.length && (event.key === 'Backspace' || event.key === 'Delete')) {
      event.preventDefault();
    }
    // Ensure cursor does not move before the prefix
    if (this.phoneNumber.startsWith(prefix) && (event.key === 'ArrowLeft' || event.key === 'Home')) {
      event.preventDefault();
      const input = event.target as HTMLInputElement;
      input.setSelectionRange(prefix.length, prefix.length);
    }
  }

}
