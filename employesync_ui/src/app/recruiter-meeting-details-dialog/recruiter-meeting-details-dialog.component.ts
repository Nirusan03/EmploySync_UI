import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recruiter-meeting-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './recruiter-meeting-details-dialog.component.html',
  styleUrls: ['./recruiter-meeting-details-dialog.component.css']
})
export class RecruiterMeetingDetailsDialogComponent {
  meetingDetails = {
    location: '',
    dateTime: '',
    attendees: '',
    email: '' // Applicant's email for notification
  };

  constructor(
    public dialogRef: MatDialogRef<RecruiterMeetingDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  saveMeeting(): void {
    console.log('Meeting Saved:', this.meetingDetails);
    this.sendEmailToApplicant(); // Trigger email compose
    this.dialogRef.close(this.meetingDetails);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createGoogleCalendarLink(): string {
    const start = new Date(this.meetingDetails.dateTime);
    const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 minutes

    const formatDate = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const startTime = formatDate(start);
    const endTime = formatDate(end);

    const title = encodeURIComponent('Recruitment Meeting');
    const details = encodeURIComponent('Please join the meeting using the provided Google Meet link.');
    const location = encodeURIComponent('Google Meet');
    const attendee = encodeURIComponent(this.meetingDetails.email || 'applicant@example.com');

    return `https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}&add=${attendee}`;
  }

  sendEmailToApplicant(): void {
    const calendarLink = this.createGoogleCalendarLink();
    const email = this.meetingDetails.email || 'applicant@example.com';

    const subject = 'Meeting Scheduled';
    const body = `Hi,\n\nA meeting has been scheduled. Please use the link below to view and join via Google Calendar:\n\n${calendarLink}\n\nRegards,\nRecruitment Team`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, '_blank');
  }
}
