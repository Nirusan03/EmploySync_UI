import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterPostJobForm3Component } from './recruiter-post-job-form-3.component';

describe('RecruiterPostJobForm3Component', () => {
  let component: RecruiterPostJobForm3Component;
  let fixture: ComponentFixture<RecruiterPostJobForm3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterPostJobForm3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterPostJobForm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
