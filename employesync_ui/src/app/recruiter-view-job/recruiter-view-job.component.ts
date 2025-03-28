import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface Job {
  _id: string;
  title: string;
  description: string;
  organization: string;
  status: string;
  createdAt: string;
  startDate?: string;
  shortlisted?: number;
  selected?: number;
  lastActivity?: string;
}

interface Applicant {
  appliedjobs: string[];
  shortlistedjobs: string[];
}

@Component({
  selector: 'app-recruiter-view-job',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    SidebarComponent
  ],
  templateUrl: './recruiter-view-job.component.html',
  styleUrls: ['./recruiter-view-job.component.css']
})
export class RecruiterViewJobComponent implements OnInit {
  displayedColumns: string[] = ['title', 'shortlisted', 'selected', 'startDate'];
  jobs: Job[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchJobsAndApplicants();
  }

  fetchJobsAndApplicants() {
    const orgId = localStorage.getItem('organizationId');
    if (!orgId) {
      alert('Organization ID not found. Please log in again.');
      return;
    }

    const jobsUrl = `http://127.0.0.1:3000/api/v1/organization/${orgId}/jobs`;
    const applicantsUrl = `http://127.0.0.1:3000/api/v1/users/get/applicants`;

    this.isLoading = true;

    Promise.all([
      this.http.get<Job[]>(jobsUrl).toPromise(),
      this.http.get<Applicant[]>(applicantsUrl).toPromise()
    ])
    .then(([jobs = [], applicants = []]) => {
      this.jobs = jobs.map(job => {
        const appliedCount = applicants.filter(applicant =>
          applicant.appliedjobs?.includes(job._id)
        ).length;

        const shortlistedCount = applicants.filter(applicant =>
          applicant.shortlistedjobs?.includes(job._id)
        ).length;

        return {
          ...job,
          startDate: new Date(job.createdAt).toLocaleDateString(),
          shortlisted: shortlistedCount,
          selected: appliedCount,
        };
      });

      this.isLoading = false;
    })
    .catch(error => {
      console.error('Error fetching jobs or applicants:', error);
      alert('Failed to load job listings. Please try again later.');
      this.isLoading = false;
    });
  }

  addNewJob() {
    console.log('Add new job clicked');
  }
}
