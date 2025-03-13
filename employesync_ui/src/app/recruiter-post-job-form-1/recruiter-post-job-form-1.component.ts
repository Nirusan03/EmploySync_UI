import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from '../sidebar/sidebar.component'; // Import Sidebar
import { RecruiterPostJobService } from '../services/recruiter-post-job.service';

@Component({
  selector: 'app-recruiter-post-job-form-1',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SidebarComponent
  ],
  templateUrl: './recruiter-post-job-form-1.component.html',
  styleUrls: ['./recruiter-post-job-form-1.component.css']
})
export class RecruiterPostJobForm1Component {
  title = '';
  position = 'Remote';
  jobType = 'Full-time';
  minEducation = '';

  constructor(private router: Router, private jobService: RecruiterPostJobService) {
    const savedData = this.jobService.getJobData();
    this.title = savedData.title;
    this.position = savedData.position;
    this.jobType = savedData.jobType;
    this.minEducation = savedData.minEducation;
  }

  nextStep() {
    this.jobService.updateJobData({
      title: this.title,
      position: this.position,
      jobType: this.jobType,
      minEducation: this.minEducation
    });

    this.router.navigate(['/post-job/step-2']);
  }
}
