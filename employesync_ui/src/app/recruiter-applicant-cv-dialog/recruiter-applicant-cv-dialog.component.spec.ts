import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterApplicantCvDialogComponent } from './recruiter-applicant-cv-dialog.component';

describe('RecruiterApplicantCvDialogComponent', () => {
  let component: RecruiterApplicantCvDialogComponent;
  let fixture: ComponentFixture<RecruiterApplicantCvDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterApplicantCvDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterApplicantCvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
