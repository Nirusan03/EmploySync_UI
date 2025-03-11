import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RecruiterPostJobService } from '../services/recruiter-post-job.service';

@Component({
  selector: 'app-recruiter-post-job-form-2',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SidebarComponent
  ],
  templateUrl: './recruiter-post-job-form-2.component.html',
  styleUrls: ['./recruiter-post-job-form-2.component.css']
})
export class RecruiterPostJobForm2Component {
  salaryType = 'per Hour';
  salary = 5000; // Single salary variable (range 50 - 100000)
  skills: string[] = [];
  skillInput = '';

  constructor(private router: Router, private jobService: RecruiterPostJobService) {
    const savedData = this.jobService.getJobData();
    this.salaryType = savedData.salaryType || 'per Hour';
    this.salary = savedData.salary || 5000;
    this.skills = savedData.skills || [];
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
    this.jobService.updateJobData({
      salaryType: this.salaryType,
      salary: this.salary,
      skills: this.skills
    });
    this.router.navigate(['/post-job/step-3']);
  }

  previousStep() {
    this.router.navigate(['/post-job/step-1']);
  }
}
