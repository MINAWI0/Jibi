import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CompteService } from '../../services/compte/compte.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  solde: number = -1;

  constructor(private userService: UserService, private router: Router, private compteService: CompteService) {
    this.compteService.compte$.subscribe((compte: any) => {
      if (compte) {
        this.solde = compte.solde;
      }
    });
  }

  ngOnInit() {
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
}
