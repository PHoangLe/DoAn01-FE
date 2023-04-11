/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiAddressService } from './api-address.service';

describe('Service: ApiAddress', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiAddressService]
    });
  });

  it('should ...', inject([ApiAddressService], (service: ApiAddressService) => {
    expect(service).toBeTruthy();
  }));
});
