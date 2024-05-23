import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  phoneNumber: string;


  constructor() {
    this.phoneNumber = ''; // Initializing properties

  }

  handleSubmit = (event: Event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    if(!this.phoneNumber.replace(/\s/g, '').match('^[0-9]{10}$')){
      alert('Invalid Phone Number');

    }

    console.log(this.phoneNumber.replace(/\s/g, ''));



  }

  formatPhoneNumber() {

    let numericValue = this.phoneNumber.replace(/\D/g, '');

    this.phoneNumber = numericValue.replace(/(\d{2})(?=\d)/g, '$1 ');
  }

}
