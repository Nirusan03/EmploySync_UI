import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterPostJobService } from '../services/recruiter-post-job.service';

@Component({
  selector: 'app-recruiter-post-job-form-4',
  templateUrl: './recruiter-post-job-form_4.component.html',
  styleUrls: ['./recruiter-post-job-form_4.component.css']
})
export class RecruiterPostJobForm4Component {
  jobDescription = '';
  isLoading = false;

  constructor(private router: Router, private jobService: RecruiterPostJobService) {
    const savedData = this.jobService.getJobData();
    this.jobDescription = savedData.description;
  }

  postJob() {
    this.isLoading = true;
    this.jobService.updateJobData({ description: this.jobDescription });

    this.jobService.postJob().subscribe({
      next: (response) => {
        console.log('Job successfully posted:', response);
        alert('Job successfully posted!');
        this.isLoading = false;
        this.router.navigate(['/jobs']); // Redirect to job listings page
      },
      error: (error) => {
        console.error('Error posting job:', error);
        alert('Failed to post job. Please try again.');
        this.isLoading = false;
      }
    });
  }

  previousStep() {
    this.router.navigate(['/post-job/step-3']);
  }
}
