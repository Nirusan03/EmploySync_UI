import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterPostJobForm2Component } from './recruiter-post-job-form-2.component';

describe('RecruiterPostJobForm2Component', () => {
  let component: RecruiterPostJobForm2Component;
  let fixture: ComponentFixture<RecruiterPostJobForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterPostJobForm2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterPostJobForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
