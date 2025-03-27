import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantAppliedJobComponent } from './applicant-applied-job.component';

describe('ApplicantAppliedJobComponent', () => {
  let component: ApplicantAppliedJobComponent;
  let fixture: ComponentFixture<ApplicantAppliedJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantAppliedJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantAppliedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
