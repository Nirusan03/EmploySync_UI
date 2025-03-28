import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-applicant-notification',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, HttpClientModule],
  templateUrl: './applicant-notification.component.html',
  styleUrls: ['./applicant-notification.component.css']
})
export class ApplicantNotificationComponent implements OnInit {
  jobTitles: string[] = [];
  isLoading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ApplicantNotificationComponent>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const shortlistedJobs: string[] = user.shortlistedjobs || [];

    if (shortlistedJobs.length === 0) {
      this.isLoading = false;
      return;
    }

    // Fetch all jobs and match them with shortlisted job IDs
    this.http.get<any[]>('http://127.0.0.1:3000/api/v1/job').subscribe({
      next: (allJobs) => {
        this.jobTitles = allJobs
          .filter((job) => shortlistedJobs.includes(job._id))
          .map((job) => job.title);
        this.isLoading = false;
      },
      error: () => {
        this.jobTitles = [];
        this.isLoading = false;
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}