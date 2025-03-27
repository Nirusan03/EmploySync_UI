import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantApplyJobComponent } from './applicant-apply-job.component';

describe('ApplicantApplyJobComponent', () => {
  let component: ApplicantApplyJobComponent;
  let fixture: ComponentFixture<ApplicantApplyJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantApplyJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantApplyJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
