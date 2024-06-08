import { TestBed } from '@angular/core/testing';

import { CreanceService } from './creance.service';

describe('CreanceService', () => {
  let service: CreanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
