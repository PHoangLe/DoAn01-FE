/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FundService } from './fund.service';

describe('Service: Fund', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FundService]
    });
  });

  it('should ...', inject([FundService], (service: FundService) => {
    expect(service).toBeTruthy();
  }));
});
