import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { RecruiterTeamComponent } from './recruiter-team/recruiter-team.component';
import { RecruiterViewJobComponent } from './recruiter-view-job/recruiter-view-job.component';
import { RecruiterRequestViewComponent } from './recruiter-request-view/recruiter-request-view.component';

// Import Job Posting Form Steps
import { RecruiterPostJobForm1Component } from './recruiter-post-job-form-1/recruiter-post-job-form-1.component';
import { RecruiterPostJobForm2Component } from './recruiter-post-job-form-2/recruiter-post-job-form-2.component';
import { RecruiterPostJobForm3Component } from './recruiter-post-job-form-3/recruiter-post-job-form-3.component';
import { RecruiterPostJobForm4Component } from './recruiter-post-job-form-4/recruiter-post-job-form-4.component';

export const routes: Routes = [
  { path: '', redirectTo: 'post-job/step-1', pathMatch: 'full' }, 
  { path: 'company', component: CompanyComponent },
  { path: 'team', component: RecruiterTeamComponent },
  { path: 'jobs', component: RecruiterViewJobComponent },
  { path: 'requests', component: RecruiterRequestViewComponent },

  { path: 'post-job/step-1', component: RecruiterPostJobForm1Component },
  { path: 'post-job/step-2', component: RecruiterPostJobForm2Component },
  { path: 'post-job/step-3', component: RecruiterPostJobForm3Component },
  { path: 'post-job/step-4', component: RecruiterPostJobForm4Component }
];

export const appRouting = provideRouter(routes);
