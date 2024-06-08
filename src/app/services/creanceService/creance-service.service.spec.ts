import { TestBed } from '@angular/core/testing';

import { CreanceServiceService } from './creance-service.service';

describe('CreanceServiceService', () => {
  let service: CreanceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreanceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
