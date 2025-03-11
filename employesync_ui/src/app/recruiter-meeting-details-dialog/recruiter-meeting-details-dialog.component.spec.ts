import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterMeetingDetailsDialogComponent } from './recruiter-meeting-details-dialog.component';

describe('RecruiterMeetingDetailsDialogComponent', () => {
  let component: RecruiterMeetingDetailsDialogComponent;
  let fixture: ComponentFixture<RecruiterMeetingDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterMeetingDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterMeetingDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
