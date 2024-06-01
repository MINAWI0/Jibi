import {Component, Input} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrl: './my.component.css'
})
export class MyComponent {
  @Input() type: 'success' | 'info' | 'warning' | 'danger' = 'success';
  @Input() message!: string;
  visible = true;
  currentRoute!: string;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }
  searchTerm: string = '';

  search() {
    // Add your search logic here
    console.log('Searching for:', this.searchTerm);
  }
  close() {
    this.visible = false;
  }
}
