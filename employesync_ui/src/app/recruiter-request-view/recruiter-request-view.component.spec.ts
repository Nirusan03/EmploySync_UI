import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterRequestViewComponent } from './recruiter-request-view.component';

describe('RecruiterRequestViewComponent', () => {
  let component: RecruiterRequestViewComponent;
  let fixture: ComponentFixture<RecruiterRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterRequestViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruiterRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
