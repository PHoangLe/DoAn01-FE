/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RescueService } from './rescue.service';

describe('Service: Rescue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RescueService]
    });
  });

  it('should ...', inject([RescueService], (service: RescueService) => {
    expect(service).toBeTruthy();
  }));
});
