import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule, // Use MatChipsModule
    MatDividerModule
  ]
})
export class RecruiterApplicantCvDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RecruiterApplicantCvDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
