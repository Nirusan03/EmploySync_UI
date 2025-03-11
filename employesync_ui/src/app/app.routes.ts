import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { RecruiterTeamComponent } from './recruiter-team/recruiter-team.component';
import { RecruiterViewJobComponent } from './recruiter-view-job/recruiter-view-job.component'; // Import Recruiter View Job Page

export const routes: Routes = [
  { path: '', redirectTo: 'company', pathMatch: 'full' },
  { path: 'company', component: CompanyComponent },
  { path: 'team', component: RecruiterTeamComponent },
  { path: 'jobs', component: RecruiterViewJobComponent } // New route for Job Listings Page
];

export const appRouting = provideRouter(routes);
