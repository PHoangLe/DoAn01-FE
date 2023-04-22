/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PetAdoptService } from './pet-adopt.service';

describe('Service: PetAdopt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetAdoptService]
    });
  });

  it('should ...', inject([PetAdoptService], (service: PetAdoptService) => {
    expect(service).toBeTruthy();
  }));
});
