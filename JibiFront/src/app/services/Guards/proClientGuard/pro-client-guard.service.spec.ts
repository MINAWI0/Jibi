import { TestBed } from '@angular/core/testing';

import { ProClientGuardService } from './pro-client-guard.service';

describe('ProClientGuardService', () => {
  let service: ProClientGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProClientGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
