import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-recruiter-meeting-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './recruiter-meeting-details-dialog.component.html',
  styleUrls: ['./recruiter-meeting-details-dialog.component.css']
})
export class RecruiterMeetingDetailsDialogComponent {
  meetingDetails = {
    location: '',
    dateTime: '',
    attendees: ''
  };

  constructor(
    public dialogRef: MatDialogRef<RecruiterMeetingDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  saveMeeting(): void {
    console.log('Meeting Saved:', this.meetingDetails);
    this.dialogRef.close(this.meetingDetails);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
