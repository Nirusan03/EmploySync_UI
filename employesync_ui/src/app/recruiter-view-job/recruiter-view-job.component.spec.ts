import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterViewJobComponent } from './recruiter-view-job.component';

describe('RecruiterViewJobComponent', () => {
  let component: RecruiterViewJobComponent;
  let fixture: ComponentFixture<RecruiterViewJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterViewJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterViewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
