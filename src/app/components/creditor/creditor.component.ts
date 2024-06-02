import {Component, OnInit} from '@angular/core';
import {CreancierDto} from "../../entities/creancier-dto";
import {CreditorService} from "../../services/creditor/creditor.service";

@Component({
  selector: 'app-creditor',
  templateUrl: './creditor.component.html',
  styleUrl: './creditor.component.css'
})
export class CreditorComponent implements OnInit {
  creditors! :CreancierDto[];

  constructor(private creditorService :CreditorService) {
  }
  ngOnInit(): void {
    this.getCreditors();
  }

  getCreditors (): void {
  this.creditorService.getCreditors().subscribe(creditors => {
    this.creditors = creditors;
  });

}


}
