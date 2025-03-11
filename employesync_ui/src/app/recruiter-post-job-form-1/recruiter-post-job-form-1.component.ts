import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterPostJobService } from '../services/recruiter-post-job.service';

@Component({
  selector: 'app-recruiter-post-job-form-1',
  templateUrl: './recruiter-post-job-form_1.component.html',
  styleUrls: ['./recruiter-post-job-form_1.component.css']
})
export class RecruiterPostJobForm1Component {
  jobTitle = '';
  position = 'Remote';
  jobType = 'Full-time';
  minEducation = '';

  constructor(private router: Router, private jobService: RecruiterPostJobService) {
    const savedData = this.jobService.getJobData();
    this.jobTitle = savedData.jobTitle;
    this.position = savedData.position;
    this.jobType = savedData.jobType;
    this.minEducation = savedData.minEducation;
  }

  nextStep() {
    this.jobService.updateJobData({ jobTitle: this.jobTitle, position: this.position, jobType: this.jobType, minEducation: this.minEducation });
    this.router.navigate(['/post-job/step-2']);
  }
}
