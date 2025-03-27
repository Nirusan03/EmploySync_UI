import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApplicantSidebarComponent } from '../applicant-sidebar/applicant-sidebar.component';

@Component({
  selector: 'app-applicant-applied-job',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ApplicantSidebarComponent],
  templateUrl: './applicant-applied-job.component.html',
  styleUrls: ['./applicant-applied-job.component.css']
})
export class ApplicantAppliedJobComponent implements OnInit {
  appliedJobDetails: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAppliedJobs();
  }

  loadAppliedJobs(): void {
    const currentUserId = JSON.parse(localStorage.getItem('user') || '{}')._id;

    if (!currentUserId) {
      alert('User not logged in.');
      return;
    }

    this.http.get<any[]>('http://127.0.0.1:3000/api/v1/users').subscribe({
      next: (users) => {
        const currentUser = users.find(u => u._id === currentUserId);

        if (!currentUser || !currentUser.appliedjobs?.length) {
          console.warn('No applied jobs found.');
          return;
        }

        this.http.get<any[]>('http://127.0.0.1:3000/api/v1/job').subscribe({
          next: (allJobs) => {
            this.appliedJobDetails = allJobs.filter(job =>
              currentUser.appliedjobs.includes(job._id)
            );
          },
          error: (err) => {
            console.error('Failed to fetch jobs:', err);
          }
        });
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
      }
    });
  }
}
