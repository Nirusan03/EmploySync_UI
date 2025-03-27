import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantUserProfileComponent } from './applicant-user-profile.component';

describe('ApplicantUserProfileComponent', () => {
  let component: ApplicantUserProfileComponent;
  let fixture: ComponentFixture<ApplicantUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicantUserProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicantUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
