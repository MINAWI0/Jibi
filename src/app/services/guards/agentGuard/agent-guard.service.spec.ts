import { TestBed } from '@angular/core/testing';

import { AgentGuardService } from './agent-guard.service';

describe('AgentGuardService', () => {
  let service: AgentGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
