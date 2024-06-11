import {Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../../../pages/login/login.component";
import {ForgotPasswordComponent} from "../../../pages/forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "../../../pages/change-password/change-password.component";
import {OtpComponent} from "../../../pages/otp/otp.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private currentDialogRef!: MatDialogRef<any>;
  constructor(
    private dialog: MatDialog,
  ) { }

  openOtpDialog(data: any){
    this.dialog.closeAll();
    this.currentDialogRef = this.dialog.open(OtpComponent, {
      height: '90%',
      width: '40%',
      position: {
        top: '6%',
        left: '39%'
      },
      data: {
        data
      }
    });
    return this.currentDialogRef;
  }

  openLoginPage() {
    this.dialog.closeAll();
    this.currentDialogRef = this.dialog.open(LoginComponent, {
      height: '90%',
      width: '40%',
      position: {
        top: '6%',
        left: '33%'
      }
    });
    return this.currentDialogRef;
  }

  openResetPasswordPage(){
    this.dialog.closeAll();
    this.currentDialogRef = this.dialog.open(ForgotPasswordComponent, {
      height: '90%',
      width: '40%',
      position: {
        top: '6%',
        left: '33%'
      }
    });
    return this.currentDialogRef;
  }

  openChangePasswordPage(){
    this.dialog.closeAll();
    this.currentDialogRef = this.dialog.open(ChangePasswordComponent, {
      height: 'max-height',
      width: '40%',
    });
    return this.currentDialogRef;
  }
}
