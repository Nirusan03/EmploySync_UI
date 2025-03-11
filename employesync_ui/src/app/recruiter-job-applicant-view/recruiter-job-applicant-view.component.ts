import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-recruiter-job-applicant-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    SidebarComponent
  ],
  templateUrl: './recruiter-job-applicant-view.component.html',
  styleUrls: ['./recruiter-job-applicant-view.component.css']
})
export class RecruiterJobApplicantViewComponent implements OnInit {
  apiUrl = 'http://127.0.0.1:3000/api/v1/users/get/applicants';
  applicants: any[] = [];
  shortlistedApplicants: any[] = [];
  isLoading = true;
  jobTitle = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.fetchApplicants();
    this.route.queryParams.subscribe(params => {
      this.jobTitle = params['jobTitle'] || 'Job Applicants';
    });
  }

  fetchApplicants() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.applicants = data.map(applicant => ({
          id: applicant._id,
          name: applicant.userName,
          email: applicant.email,
          profileImage: applicant.profileImage || 'https://via.placeholder.com/40',
          appliedJobs: applicant.appliedjobs.length,
          shortlistedJobs: applicant.shortlistedjobs.length
        }));

        this.shortlistedApplicants = this.applicants.filter(a => a.shortlistedJobs > 0);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching applicants:', error);
        this.isLoading = false;
      }
    });
  }

  viewApplicantProfile(applicantId: string) {
    console.log('Viewing profile for applicant ID:', applicantId);
    // Implement navigation or detailed view logic if required
  }

  goBack() {
    this.router.navigate(['/requests']);
  }
}
  