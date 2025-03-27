import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantJobViewComponent } from './applicant-job-view.component';

describe('ApplicantJobViewComponent', () => {
  let component: ApplicantJobViewComponent;
  let fixture: ComponentFixture<ApplicantJobViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantJobViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantJobViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
