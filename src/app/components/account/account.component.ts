import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import {CompteService} from "../../services/compte/compte.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  qrData: string = '';
  solde: number = 0;

  constructor(private userService: UserService, private compteService: CompteService  ) {
    this.solde=compteService.getCompte().solde
  }

  ngOnInit(): void {
    const user = this.userService.getUser();
    this.qrData = user.numTel; // Assuming numTel is the account ID
  }
}
