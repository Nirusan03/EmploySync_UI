import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterPostJobForm4Component } from './recruiter-post-job-form-4.component';

describe('RecruiterPostJobForm4Component', () => {
  let component: RecruiterPostJobForm4Component;
  let fixture: ComponentFixture<RecruiterPostJobForm4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterPostJobForm4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterPostJobForm4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
