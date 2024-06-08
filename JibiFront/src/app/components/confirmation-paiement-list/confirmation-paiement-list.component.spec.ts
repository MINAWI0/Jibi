import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPaiementListComponent } from './confirmation-paiement-list.component';

describe('ConfirmationPaiementListComponent', () => {
  let component: ConfirmationPaiementListComponent;
  let fixture: ComponentFixture<ConfirmationPaiementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationPaiementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmationPaiementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
