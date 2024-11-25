import { TestBed } from '@angular/core/testing';

import { PdfdownloadserviceService } from './pdfdownloadservice.service';

describe('PdfdownloadserviceService', () => {
  let service: PdfdownloadserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfdownloadserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
