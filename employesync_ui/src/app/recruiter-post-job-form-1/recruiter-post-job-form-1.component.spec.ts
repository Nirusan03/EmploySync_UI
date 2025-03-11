import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterPostJobForm1Component } from './recruiter-post-job-form-1.component';

describe('RecruiterPostJobForm1Component', () => {
  let component: RecruiterPostJobForm1Component;
  let fixture: ComponentFixture<RecruiterPostJobForm1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterPostJobForm1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterPostJobForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
