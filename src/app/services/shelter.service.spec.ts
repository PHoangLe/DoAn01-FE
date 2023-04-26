/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShelterService } from './shelter.service';

describe('Service: Shelter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShelterService]
    });
  });

  it('should ...', inject([ShelterService], (service: ShelterService) => {
    expect(service).toBeTruthy();
  }));
});
