import { TestBed } from '@angular/core/testing';

import { ViewStudentService } from './view-student.service';

describe('ViewStudentService', () => {
  let service: ViewStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
