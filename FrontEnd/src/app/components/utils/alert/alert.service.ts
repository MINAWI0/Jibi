import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showSuccess() {
    Swal.fire({
      title: 'Succès',
      text: 'Opération réussie !',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  showError(msg: string) {
    Swal.fire({
      title: 'Erreur',
      text: msg,
      icon: 'error',
      confirmButtonText: 'OK',
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
