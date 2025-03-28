import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SidebarComponent
  ],
  templateUrl: './recruiter-post-job-form-2.component.html',
  styleUrls: ['./recruiter-post-job-form-2.component.css']
})
export class RecruiterPostJobForm2Component {
  salaryPerHour: number = 50;
  skills: string[] = [];
  skillInput = '';

  constructor(private router: Router, private jobService: RecruiterPostJobService) {
    const savedData = this.jobService.getJobData();
    this.salaryPerHour = savedData.salaryPerHour || 50;
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
      salaryPerHour: this.salaryPerHour,
      skills: this.skills
    });
    this.router.navigate(['/post-job/step-3']);
  }

  previousStep() {
    this.router.navigate(['/post-job/step-1']);
  }
}
