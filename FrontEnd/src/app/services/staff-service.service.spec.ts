import { TestBed } from '@angular/core/testing';

import { StaffServiceService } from './staff-service.service';

describe('StaffServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaffServiceService = TestBed.get(StaffServiceService);
    expect(service).toBeTruthy();
  });
});
