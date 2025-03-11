import { TestBed } from '@angular/core/testing';

import { RecruiterPostJobService } from './recruiter-post-job.service';

describe('RecruiterPostJobService', () => {
  let service: RecruiterPostJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruiterPostJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
