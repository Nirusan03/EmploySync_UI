import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RecruiterApplicantCvDialogComponent } from '../recruiter-applicant-cv-dialog/recruiter-applicant-cv-dialog.component';
import { RecruiterMeetingDetailsDialogComponent } from '../recruiter-meeting-details-dialog/recruiter-meeting-details-dialog.component';

@Component({
  selector: 'app-recruiter-job-applicant-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    SidebarComponent
  ],
  templateUrl: './recruiter-job-applicant-view.component.html',
  styleUrls: ['./recruiter-job-applicant-view.component.css']
})
export class RecruiterJobApplicantViewComponent implements OnInit {
  apiUrl = 'http://127.0.0.1:3000/api/v1/users/get/applicants';
  applicants: any[] = [];
  shortlistedApplicants: any[] = [];
  isLoading = true;
  jobTitle = '';
  isShortlistedTab = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchApplicants();
    this.route.queryParams.subscribe(params => {
      this.jobTitle = params['jobTitle'] || 'Job Applicants';
    });
  }

  fetchApplicants() {
    this.isLoading = true;
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.applicants = data.map(applicant => ({
          id: applicant._id,
          name: applicant.userName,
          email: applicant.email,
          profileImage: applicant.profileImage || 'https://via.placeholder.com/40',
          appliedJobs: applicant.appliedjobs?.length || 0,
          shortlistedJobs: applicant.shortlistedjobs?.length || 0
        }));

        this.shortlistedApplicants = this.applicants.filter(a => a.shortlistedJobs > 0);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching applicants:', error);
        this.isLoading = false;
      }
    });
  }

  viewApplicantProfile(applicantId: string) {
    const cvApiUrl = `http://127.0.0.1:3000/api/v1/users/${applicantId}/cv`;

    this.http.get<any>(cvApiUrl).subscribe({
      next: (cvData) => {
        this.dialog.open(RecruiterApplicantCvDialogComponent, {
          width: '700px',
          data: cvData
        });
      },
      error: (error) => {
        console.error('Error fetching CV:', error);
      }
    });
  }

  openMeetingDetails(applicantId: string) {
    this.dialog.open(RecruiterMeetingDetailsDialogComponent, {
      width: '600px',
      data: { applicantId }
    });
  }

  setActiveTab(event: any) {
    this.isShortlistedTab = event.index === 1; 
  }

  goBack() {
    this.router.navigate(['/requests']);
  }
}
