import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterPostJobService } from '../services/recruiter-post-job.service';

@Component({
  selector: 'app-recruiter-post-job-form-3',
  templateUrl: './recruiter-post-job-form_3.component.html',
  styleUrls: ['./recruiter-post-job-form_3.component.css']
})
export class RecruiterPostJobForm3Component {
  experienceMin = 1;
  experienceMax = 5;
  screeningQuestions: string[] = [];

  constructor(private router: Router, private jobService: RecruiterPostJobService) {
    const savedData = this.jobService.getJobData();
    this.experienceMin = savedData.experienceMin;
    this.experienceMax = savedData.experienceMax;
    this.screeningQuestions = savedData.screeningQuestions;
  }

  addQuestion() {
    this.screeningQuestions.push('');
  }

  removeQuestion(index: number) {
    this.screeningQuestions.splice(index, 1);
  }

  nextStep() {
    this.jobService.updateJobData({ experienceMin: this.experienceMin, experienceMax: this.experienceMax, screeningQuestions: this.screeningQuestions });
    this.router.navigate(['/post-job/step-4']);
  }

  previousStep() {
    this.router.navigate(['/post-job/step-2']);
  }
}
