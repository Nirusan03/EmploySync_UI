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

  constructor(private router: Router, private jobService: RecruiterPostJobService) {
    const savedData = this.jobService.getJobData();
    this.jobDescription = savedData.jobDescription;
  }

  postJob() {
    this.jobService.updateJobData({ jobDescription: this.jobDescription });

    // Simulate API Call
    console.log('Job Posted:', this.jobService.getJobData());
    alert('Job successfully posted!');

    // Navigate back to job listing or dashboard
    this.router.navigate(['/jobs']);
  }

  previousStep() {
    this.router.navigate(['/post-job/step-3']);
  }
}
