import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreanciersComponent } from './creanciers.component';

describe('CreditorComponent', () => {
  let component: CreanciersComponent;
  let fixture: ComponentFixture<CreanciersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreanciersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreanciersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
