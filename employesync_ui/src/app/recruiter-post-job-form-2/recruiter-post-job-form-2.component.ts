import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterPostJobService } from '../services/recruiter-post-job.service';

@Component({
  selector: 'app-recruiter-post-job-form-2',
  templateUrl: './recruiter-post-job-form_2.component.html',
  styleUrls: ['./recruiter-post-job-form_2.component.css']
})
export class RecruiterPostJobForm2Component {
  salaryType = 'per Hour';
  salaryMin = 50;
  salaryMax = 1000;
  skills: string[] = [];
  skillInput = '';

  constructor(private router: Router, private jobService: RecruiterPostJobService) {
    const savedData = this.jobService.getJobData();
    this.salaryType = savedData.salaryType;
    this.salaryMin = savedData.salaryMin;
    this.salaryMax = savedData.salaryMax;
    this.skills = savedData.skills;
  }

  addSkill() {
    if (this.skillInput.trim()) {
      this.skills.push(this.skillInput.trim());
      this.skillInput = '';
    }
  }

  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }

  nextStep() {
    this.jobService.updateJobData({ salaryType: this.salaryType, salaryMin: this.salaryMin, salaryMax: this.salaryMax, skills: this.skills });
    this.router.navigate(['/post-job/step-3']);
  }

  previousStep() {
    this.router.navigate(['/post-job/step-1']);
  }
}
