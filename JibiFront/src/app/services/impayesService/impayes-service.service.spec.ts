import { TestBed } from '@angular/core/testing';

import { ImpayesServiceService } from './impayes-service.service';

describe('ImpayesServiceService', () => {
  let service: ImpayesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpayesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
