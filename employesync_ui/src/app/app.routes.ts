import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { RecruiterTeamComponent } from './recruiter-team/recruiter-team.component'; // Import Recruiter Team Page

export const routes: Routes = [
  { path: '', redirectTo: 'company', pathMatch: 'full' },
  { path: 'company', component: CompanyComponent },
  { path: 'team', component: RecruiterTeamComponent } // New route for the Team Page
];

export const appRouting = provideRouter(routes);
