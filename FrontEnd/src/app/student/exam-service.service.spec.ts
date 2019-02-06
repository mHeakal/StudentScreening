import { TestBed } from '@angular/core/testing';

import { ExamServiceService } from './exam-service.service';

describe('ExamServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamServiceService = TestBed.get(ExamServiceService);
    expect(service).toBeTruthy();
  });
});
