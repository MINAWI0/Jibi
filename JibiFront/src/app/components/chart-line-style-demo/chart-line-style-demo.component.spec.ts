import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLineStyleDemoComponent } from './chart-line-style-demo.component';

describe('ChartLineStyleDemoComponent', () => {
  let component: ChartLineStyleDemoComponent;
  let fixture: ComponentFixture<ChartLineStyleDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartLineStyleDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartLineStyleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
