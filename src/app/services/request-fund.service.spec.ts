/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestFundService } from './request-fund.service';

describe('Service: RequestFund', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestFundService]
    });
  });

  it('should ...', inject([RequestFundService], (service: RequestFundService) => {
    expect(service).toBeTruthy();
  }));
});
