import {Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../../../pages/login/login.component";
import {ForgotPasswordComponent} from "../../../pages/forgot-password/forgot-password.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private currentDialogRef!: MatDialogRef<any>;
  constructor(
    private dialog: MatDialog,
  ) { }

  openLoginPage() {
    this.dialog.closeAll();
    this.currentDialogRef = this.dialog.open(LoginComponent, {
      height: '98%',
    });
    return this.currentDialogRef;
  }

  openResetPasswordPage(){
    this.dialog.closeAll();
    this.currentDialogRef = this.dialog.open(ForgotPasswordComponent, {
      height: 'max-height',
    });
    return this.currentDialogRef;
  }
}
