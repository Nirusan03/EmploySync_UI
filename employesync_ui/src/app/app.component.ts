import { Component } from '@angular/core';
import { CompanyComponent } from './company/company.component';
import { RecruiterTeamComponent } from './recruiter-team/recruiter-team.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecruiterTeamComponent],
  template: `<app-recruiter-team></app-recruiter-team>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
