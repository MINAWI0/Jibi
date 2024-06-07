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
    this.phoneNumber = ''; // Initializing properties
  }

  handleSubmit = (event: Event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    if(!this.phoneNumber.replace(/\s/g, '').match('^[0-9]{10}$')){
      this.alertService.showWarning('Invalid Phone Number');

    }

    console.log(this.phoneNumber.replace(/\s/g, ''));



  }

  formatPhoneNumber() {

    let numericValue = this.phoneNumber.replace(/\D/g, '');

    this.phoneNumber = numericValue.replace(/(\d{2})(?=\d)/g, '$1 ');
  }

}
