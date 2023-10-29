import { TestBed } from '@angular/core/testing';

import { RnboService } from './rnbo.service';

describe('RnboService', () => {
  let service: RnboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RnboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
