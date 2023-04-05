/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestShelterAccountService } from './request-shelter-account.service';

describe('Service: RequestShelterAccount', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestShelterAccountService]
    });
  });

  it('should ...', inject([RequestShelterAccountService], (service: RequestShelterAccountService) => {
    expect(service).toBeTruthy();
  }));
});
