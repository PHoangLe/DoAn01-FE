/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PetAdoptionService } from './pet-adoption.service';

describe('Service: PetAdoption', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetAdoptionService]
    });
  });

  it('should ...', inject([PetAdoptionService], (service: PetAdoptionService) => {
    expect(service).toBeTruthy();
  }));
});
