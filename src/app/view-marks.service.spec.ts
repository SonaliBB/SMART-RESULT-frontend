import { TestBed } from '@angular/core/testing';

import { ViewMarksService } from './view-marks.service';

describe('ViewMarksService', () => {
  let service: ViewMarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewMarksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
