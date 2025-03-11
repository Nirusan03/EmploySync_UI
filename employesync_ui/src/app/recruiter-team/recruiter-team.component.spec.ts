import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterTeamComponent } from './recruiter-team.component';

describe('RecruiterTeamComponent', () => {
  let component: RecruiterTeamComponent;
  let fixture: ComponentFixture<RecruiterTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
