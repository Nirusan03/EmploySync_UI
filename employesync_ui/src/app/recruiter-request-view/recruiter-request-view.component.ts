import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-recruiter-request-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    SidebarComponent
  ],
  templateUrl: './recruiter-request-view.component.html',
  styleUrls: ['./recruiter-request-view.component.css']
})
export class RecruiterRequestViewComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'createdAt', 'view'];
  jobRequests: any[] = [];
  isLoading = true;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    const orgId = localStorage.getItem('organizationId');

    if (!orgId) {
      alert('Organization ID not found. Please log in again.');
      this.isLoading = false;
      return;
    }

    const apiUrl = `http://127.0.0.1:3000/api/v1/organization/${orgId}/jobs`;

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.jobRequests = data.map(job => ({
          title: job.title,
          status: job.status,
          createdAt: new Date(job.createdAt).toLocaleDateString(),
          jobId: job._id
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
        this.isLoading = false;
      }
    });
  }

  navigateToAddJob() {
    this.router.navigate(['/post-job/step-1']);
  }

  viewApplications(jobId: string, jobTitle: string) {
    this.router.navigate([`/requests/${jobId}/applicants`], { queryParams: { jobTitle } });
  }
}
