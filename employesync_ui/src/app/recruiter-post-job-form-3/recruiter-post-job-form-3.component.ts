import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RecruiterPostJobService } from '../services/recruiter-post-job.service';

@Component({
  selector: 'app-recruiter-post-job-form-3',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    SidebarComponent
  ],
  templateUrl: './recruiter-post-job-form-3.component.html',
  styleUrls: ['./recruiter-post-job-form-3.component.css']
})
export class RecruiterPostJobForm3Component {
  yearOfExperience = 0;
  responsibilities: { text: string }[] = [];

  constructor(private router: Router, private jobService: RecruiterPostJobService) {
    const savedData = this.jobService.getJobData();
    this.yearOfExperience = savedData.yearOfExperience || 0;
    this.responsibilities = savedData.responsibilities?.map((r: string) => ({ text: r })) || [];
  }

  addResponsibility() {
    this.responsibilities.push({ text: '' });
  }

  updateResponsibility(index: number, value: string) {
    this.responsibilities[index].text = value;
  }

  removeResponsibility(index: number) {
    this.responsibilities.splice(index, 1);
  }

  nextStep() {
    this.jobService.updateJobData({
      yearOfExperience: this.yearOfExperience,
      responsibilities: this.responsibilities.map(r => r.text)
    });
    this.router.navigate(['/post-job/step-4']);
  }

  previousStep() {
    this.router.navigate(['/post-job/step-2']);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
