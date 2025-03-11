import { Component } from '@angular/core';
import { CompanyComponent } from './company/company.component';
import { RecruiterTeamComponent } from './recruiter-team/recruiter-team.component';
import { RecruiterViewJobComponent } from './recruiter-view-job/recruiter-view-job.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecruiterViewJobComponent],
  template: `<app-recruiter-view-job></app-recruiter-view-job>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
