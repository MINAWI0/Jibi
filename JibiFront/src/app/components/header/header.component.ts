import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CompteService} from "../../services/compte/compte.service";
import {SessionService} from "../utils/session/session.service";
import {DialogService} from "../utils/dialog/dialog.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  solde: number = -1;


  constructor(
    private sessionService: SessionService,
    private router: Router,
    private compteService: CompteService,
    protected dialogService: DialogService,) {
    this.compteService.compte$.subscribe((compte: any) => {
      if (compte) {
        this.solde = compte.solde;
      }
    });
  }

  ngOnInit(): void {
    const compte = this.compteService.getCompte();
    if (compte) {
      this.solde = compte.solde;
    }

    this.compteService.compte$.subscribe((compte: any) => {
      if (compte) {
        this.solde = compte.solde;
      }
    });
  }

  isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn();
  }

  logout(): void {
    this.sessionService.clearSessionData();
  }

  isClient(): boolean {
    const user = this.sessionService.getUser();
    return user && 'clientType' in user;
  }

  logIn() {
    this.dialogService.openLoginPage()
  }
}
