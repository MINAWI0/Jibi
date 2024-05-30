import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProClientPageComponent } from './pro-client-page.component';

describe('ProClientPageComponent', () => {
  let component: ProClientPageComponent;
  let fixture: ComponentFixture<ProClientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProClientPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
