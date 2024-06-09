import { TestBed } from '@angular/core/testing';

import { NormalClientGuardService } from './normal-client-guard.service';

describe('NormalClientGuardService', () => {
  let service: NormalClientGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormalClientGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
