import { Component } from '@angular/core';
import { CompanyComponent } from './company/company.component';
import { RecruiterTeamComponent } from './recruiter-team/recruiter-team.component';
import { RecruiterViewJobComponent } from './recruiter-view-job/recruiter-view-job.component';
import { RecruiterPostJobForm1Component } from './recruiter-post-job-form-1/recruiter-post-job-form-1.component';
import { RecruiterPostJobForm2Component } from './recruiter-post-job-form-2/recruiter-post-job-form-2.component';
import { RecruiterPostJobForm3Component } from './recruiter-post-job-form-3/recruiter-post-job-form-3.component';
import { RecruiterPostJobForm4Component } from './recruiter-post-job-form-4/recruiter-post-job-form-4.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecruiterViewJobComponent],
  template: `<app-recruiter-view-job></app-recruiter-view-job>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
