import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import {ComptePaiementService} from "../../services/comptePaiement/compte-paiement.service";
import {response} from "express";
import {ComptePaiementDto} from "../../entities/comptePaiement-dto";
import {CompteService} from "../../services/compte/compte.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  solde: number = -1;


  constructor(private userService: UserService, private router: Router, private compte: CompteService) {}

  ngOnInit(): void {
    this.solde = this.getSolde();
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
  isClient(): boolean {
    const user = this.userService.getUser();
    return user && 'clientType' in user;
  }
  getSolde(): any {
    // const user = this.userService.getUser();
    // const numTel = user.numTel;
    // let solde = 0;
    // const compte = this.compte.getCompte();
    // if (compte) {
    //   solde = compte.solde;
    // }
    // return solde;
  }
}
