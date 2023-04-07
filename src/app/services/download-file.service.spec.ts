/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DownloadFileService } from './download-file.service';

describe('Service: DownloadFile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloadFileService]
    });
  });

  it('should ...', inject([DownloadFileService], (service: DownloadFileService) => {
    expect(service).toBeTruthy();
  }));
});
