import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterJobApplicantViewComponent } from './recruiter-job-applicant-view.component';

describe('RecruiterJobApplicantViewComponent', () => {
  let component: RecruiterJobApplicantViewComponent;
  let fixture: ComponentFixture<RecruiterJobApplicantViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterJobApplicantViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterJobApplicantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
