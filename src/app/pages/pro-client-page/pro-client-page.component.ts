import {Component, OnInit} from '@angular/core';
import {CreancierDto} from "../../entities/creancier-dto";
import {CreancierService} from "../../services/creancier/creancier.service";

@Component({
  selector: 'app-pro-client-page',
  templateUrl: './pro-client-page.component.html',
  styleUrl: './pro-client-page.component.css'
})
export class ProClientPageComponent implements OnInit{
  creanciers: CreancierDto[] = [];

  constructor(private creancierService: CreancierService) {}

  ngOnInit(): void {
    this.getCreanciers();
  }

    getCreanciers(): void {
      this.creancierService.getAllCreanciers().subscribe((data: CreancierDto[]) => {
        this.creanciers = data;
      });
    }

  }
