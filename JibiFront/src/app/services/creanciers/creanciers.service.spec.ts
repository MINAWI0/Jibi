import { TestBed } from '@angular/core/testing';

import { CreanciersService } from './creanciers.service';

describe('CreditorService', () => {
  let service: CreanciersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreanciersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
