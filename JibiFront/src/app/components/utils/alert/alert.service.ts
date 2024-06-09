import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showSuccess(message: string) {
    const successHtml = `
    <div class="success-container">
      <img src="assets/imgs/logo/icon-correct.png" alt="correct image" class="correct-logo" />
      <h3>${message}</h3>
    </div>
  `;

    Swal.fire({
      html: successHtml,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  showError(msg: string) {
    const errorHtml = `
     <h3>${msg}</h3>
  `;
    Swal.fire({
      html: errorHtml,
      icon: 'error',
      showConfirmButton: false,
      timer: 4000,
    });
  }

  showInfo(msg: string) {
    Swal.fire({
      title: 'Info',
      text: msg,
      icon: 'info',
      confirmButtonText: 'OK',
    });
  }

  showWarning(msg: string) {
    Swal.fire({
      title: 'Avertissement',
      text: msg,
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  }
}