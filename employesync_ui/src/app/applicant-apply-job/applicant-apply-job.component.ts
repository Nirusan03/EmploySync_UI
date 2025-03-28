import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; //  Required for ngModel
import { ApplicantSidebarComponent } from '../applicant-sidebar/applicant-sidebar.component';

@Component({
  selector: 'app-applicant-apply-job',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule, // Added here
    MatSlideToggleModule,
    MatIconModule,
    ApplicantSidebarComponent
  ],
  templateUrl: './applicant-apply-job.component.html',
  styleUrls: ['./applicant-apply-job.component.css']
})
export class ApplicantApplyJobComponent implements OnInit {
  jobs: any[] = [];
  filteredJobs: any[] = [];
  isLoading = true;

  filterCompany: string = '';
  filterLocation: string = '';
  filterRole: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs() {
    const apiUrl = 'http://127.0.0.1:3000/api/v1/organization/jobs';
    this.http.get<any[]>(apiUrl).subscribe({
      next: (res) => {
        this.jobs = res;
        this.filteredJobs = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch jobs', err);
        this.isLoading = false;
      }
    });
  }

  applyFilters() {
    this.filteredJobs = this.jobs.filter(job => {
      const matchesCompany = this.filterCompany
        ? job.organization?.name?.toLowerCase().includes(this.filterCompany.toLowerCase())
        : true;

      const matchesLocation = this.filterLocation
        ? job.location?.toLowerCase().includes(this.filterLocation.toLowerCase())
        : true;

      const matchesRole = this.filterRole
        ? job.title?.toLowerCase().includes(this.filterRole.toLowerCase())
        : true;

      return matchesCompany && matchesLocation && matchesRole;
    });
  }

  onToggle(jobId: string) {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('User not found. Please log in again.');
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user._id;

    const apiUrl = `http://127.0.0.1:3000/api/v1/job/${jobId}/apply`;

    const body = {
      userId: userId
    };

    this.http.post(apiUrl, body).subscribe({
      next: (res) => {
        alert('Successfully applied for the job!');
      },
      error: (err) => {
        alert('You had applied to the job already.');
      }
    });
  }

  navigateToJob(job: any) {
    localStorage.setItem('selectedJob', JSON.stringify(job));
    this.router.navigate(['/job-view', job._id]);
  }
}
