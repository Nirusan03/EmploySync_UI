import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

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
    MatDividerModule
  ]
})
export class RecruiterApplicantCvDialogComponent {
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<RecruiterApplicantCvDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  shortlistApplicant(): void {
    const applicantId = this.data._id; // from CV data
    const jobId = this.data.jobId; // should be passed from parent component

    if (!applicantId || !jobId) {
      alert('Missing job or applicant ID.');
      return;
    }

    const url = `http://127.0.0.1:3000/api/v1/job/${jobId}/shortlist`;
    const payload = { applicantId };

    this.http.put(url, payload).subscribe({
      next: () => {
        alert('Applicant shortlisted successfully.');
        this.closeDialog();
      },
      error: (err) => {
        console.error('Failed to shortlist applicant:', err);
        alert('Error shortlisting applicant.');
      }
    });
  }
}
