import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreancesComponent } from './creances.component';

describe('FormsComponent', () => {
  let component: CreancesComponent;
  let fixture: ComponentFixture<CreancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
