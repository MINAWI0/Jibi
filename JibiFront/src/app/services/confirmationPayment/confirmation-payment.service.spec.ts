import { TestBed } from '@angular/core/testing';

import { ConfirmationPaymentService } from './confirmation-payment.service';

describe('ConfirmationPaymentService', () => {
  let service: ConfirmationPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
