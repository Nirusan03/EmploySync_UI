import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-applicant-notification',
  standalone: true,
  templateUrl: './applicant-notification.component.html',
  styleUrls: ['./applicant-notification.component.css'],
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class ApplicantNotificationComponent {
  shortlistedJobs: string[];

  constructor(
    public dialogRef: MatDialogRef<ApplicantNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jobs: string[] }
  ) {
    this.shortlistedJobs = data.jobs || [];
  }

  close(): void {
    this.dialogRef.close();
  }
}
