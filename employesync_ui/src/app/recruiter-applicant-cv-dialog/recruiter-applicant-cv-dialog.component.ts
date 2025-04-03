import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recruiter-applicant-cv-dialog',
  standalone: true,
  templateUrl: './recruiter-applicant-cv-dialog.component.html',
  styleUrls: ['./recruiter-applicant-cv-dialog.component.css'],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    FormsModule
  ]
})
export class RecruiterApplicantCvDialogComponent {
  recruitingMessage: string = '';

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<RecruiterApplicantCvDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  shortlistApplicant() {
    console.log('shortlistApplicant() called, data:', this.data);
    const updateUrl = `http://127.0.0.1:3000/api/v1/users/${this.data._id}/application-status`;
    this.http.patch(updateUrl, { jobId: this.data.jobId, status: 'accepted' })
      .subscribe({
        next: (response) => {
          console.log('API call succeeded: Application status updated to accepted:', response);
          alert('Application shortlisted successfully!');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('API call error updating application status:', error);
        }
      });
  }
  
  rejectApplicant() {
    console.log('rejectApplicant() called, data:', this.data);
    const updateUrl = `http://127.0.0.1:3000/api/v1/users/${this.data._id}/application-status`;
    this.http.patch(updateUrl, { jobId: this.data.jobId, status: 'rejected' })
      .subscribe({
        next: (response) => {
          console.log('API call succeeded: Application status updated to rejected:', response);
          alert('Application rejected successfully!');
          this.dialogRef.close(false);
        },
        error: (error) => {
          console.error('API call error updating application status:', error);
        }
      });
  }
  
  saveRecruitingMessage() {
    if (!this.recruitingMessage.trim()) {
      alert('Please enter a recruiting message.');
      return;
    }
    const key = `recruitingMessage_${this.data._id}_${this.data.jobId}`;
    localStorage.setItem(key, this.recruitingMessage);
    alert('Recruiting message added!');
    // Optionally clear the input field after saving.
    this.recruitingMessage = '';
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
