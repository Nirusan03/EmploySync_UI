import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RecruiterPostJobService } from '../services/recruiter-post-job.service';

@Component({
  selector: 'app-recruiter-post-job-form-3',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './recruiter-post-job-form-3.component.html',
  styleUrls: ['./recruiter-post-job-form-3.component.css']
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
    this.jobService.updateJobData({
      experienceMin: this.experienceMin,
      experienceMax: this.experienceMax,
      screeningQuestions: this.screeningQuestions
    });
    this.router.navigate(['/post-job/step-4']);
  }

  previousStep() {
    this.router.navigate(['/post-job/step-2']);
  }
}
