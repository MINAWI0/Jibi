import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSignupPageComponent } from './success-signup-page.component';

describe('SuccessSignupPageComponent', () => {
  let component: SuccessSignupPageComponent;
  let fixture: ComponentFixture<SuccessSignupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessSignupPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessSignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
