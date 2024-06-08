import { TestBed } from '@angular/core/testing';

import { ConfirmationPaiementService } from './confirmation-paiement.service';

describe('ConfirmationPaiementService', () => {
  let service: ConfirmationPaiementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationPaiementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
