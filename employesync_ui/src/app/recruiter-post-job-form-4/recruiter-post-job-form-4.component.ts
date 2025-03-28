import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RecruiterPostJobService } from '../services/recruiter-post-job.service';

@Component({
  selector: 'app-recruiter-post-job-form-4',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    SidebarComponent
  ],
  templateUrl: './recruiter-post-job-form-4.component.html',
  styleUrls: ['./recruiter-post-job-form-4.component.css']
})
export class RecruiterPostJobForm4Component {
  jobDescription = '';
  isLoading = false;

  constructor(private router: Router, private jobService: RecruiterPostJobService) {
    const savedData = this.jobService.getJobData();
    this.jobDescription = savedData.description || '';
  }

  postJob() {
    this.isLoading = true;
    this.jobService.updateJobData({ description: this.jobDescription });

    this.jobService.postJob().subscribe({
      next: (res) => {
        alert('Job successfully posted!');
        this.router.navigate(['/jobs']);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to post job:', err);
        alert('Something went wrong while posting the job.');
        this.isLoading = false;
      }
    });
  }

  previousStep() {
    this.router.navigate(['/post-job/step-3']);
  }
}
