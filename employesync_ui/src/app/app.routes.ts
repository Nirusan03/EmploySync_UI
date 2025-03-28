import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

// Authentication
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';

// Applicant Components
import { ApplicantApplyJobComponent } from './applicant-apply-job/applicant-apply-job.component';
import { ApplicantAppliedJobComponent } from './applicant-applied-job/applicant-applied-job.component';
import { ApplicantJobViewComponent } from './applicant-job-view/applicant-job-view.component';
import { ApplicantUserProfileComponent } from './applicant-user-profile/applicant-user-profile.component';
import { ApplicantNotificationComponent } from './applicant-notification/applicant-notification.component';

// Recruiter Components
import { CompanyComponent } from './company/company.component';
import { RecruiterTeamComponent } from './recruiter-team/recruiter-team.component';
import { RecruiterViewJobComponent } from './recruiter-view-job/recruiter-view-job.component';
import { RecruiterRequestViewComponent } from './recruiter-request-view/recruiter-request-view.component';
import { RecruiterJobApplicantViewComponent } from './recruiter-job-applicant-view/recruiter-job-applicant-view.component';
import { RecruiterMeetingDetailsDialogComponent } from './recruiter-meeting-details-dialog/recruiter-meeting-details-dialog.component';

// Job Posting Steps
import { RecruiterPostJobForm1Component } from './recruiter-post-job-form-1/recruiter-post-job-form-1.component';
import { RecruiterPostJobForm2Component } from './recruiter-post-job-form-2/recruiter-post-job-form-2.component';
import { RecruiterPostJobForm3Component } from './recruiter-post-job-form-3/recruiter-post-job-form-3.component';
import { RecruiterPostJobForm4Component } from './recruiter-post-job-form-4/recruiter-post-job-form-4.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Authentication
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {path: 'admin' , component: AdminComponent},

  // Applicant Routes
  { path: 'apply-job', component: ApplicantApplyJobComponent },
  { path: 'applied-jobs', component: ApplicantAppliedJobComponent },
  { path: 'job-view/:jobId', component: ApplicantJobViewComponent },
  { path: 'user-profile', component: ApplicantUserProfileComponent },
  { path: 'notifications', component: ApplicantNotificationComponent },

  // Recruiter Routes
  { path: 'company', component: CompanyComponent },
  { path: 'team', component: RecruiterTeamComponent },
  { path: 'jobs', component: RecruiterViewJobComponent },
  { path: 'requests', component: RecruiterRequestViewComponent },
  { path: 'requests/:jobId/applicants', component: RecruiterJobApplicantViewComponent },
  { path: 'requests/:jobId/meeting-details', component: RecruiterMeetingDetailsDialogComponent },

  // Job Posting Steps
  { path: 'post-job/step-1', component: RecruiterPostJobForm1Component },
  { path: 'post-job/step-2', component: RecruiterPostJobForm2Component },
  { path: 'post-job/step-3', component: RecruiterPostJobForm3Component },
  { path: 'post-job/step-4', component: RecruiterPostJobForm4Component }
];

export const appRouting = provideRouter(routes);