import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeSoldeComponent } from './recharge-solde.component';

describe('RechargeSoldeComponent', () => {
  let component: RechargeSoldeComponent;
  let fixture: ComponentFixture<RechargeSoldeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RechargeSoldeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechargeSoldeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
