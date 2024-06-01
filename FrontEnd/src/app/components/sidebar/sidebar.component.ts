import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  currentRoute!: any;
  current!: any;
  navs!: any;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url.split('/').at(2);
        this.current= event.url.split('/').at(1);
      }
      this.navs =[
        {name: 'Dashboard',image: 'assets/imgs/icons/dash.png',link:'dashboard',visible: this.current=='admin' || this.current=='client' },
        {name: 'Transactions',image: 'assets/imgs/icons/img_2.png',link:'',visible: this.current=='admin' || this.current=='client' },
        {name: 'Paiements et factures',image: 'assets/imgs/icons/img_2.png',link:'',visible: this.current=='admin' || this.current=='client'},
        {name: 'Notifications',image: 'assets/imgs/icons/img_2.png',link:'',visible: this.current=='admin' || this.current=='client'},
        {name: 'New Client',image: 'assets/imgs/icons/img_5.png',link:'create-client',visible: this.current=='agent'},
        {name: 'New Agent',image: 'assets/imgs/icons/img_7.png',link:'create-agent',visible: this.current=='admin'},
        {name: 'New Agency',image: 'assets/imgs/icons/img_8.png',link:'user-management',visible: this.current=='admin'}
      ]
    });
  }
  searchTerm: string = '';

  search() {
    // Add your search logic here
    console.log('Searching for:', this.searchTerm);
  }

}
