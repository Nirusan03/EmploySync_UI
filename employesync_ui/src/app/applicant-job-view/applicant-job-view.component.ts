import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicantSidebarComponent } from '../applicant-sidebar/applicant-sidebar.component';

@Component({
  selector: 'app-applicant-job-view',
  standalone: true,
  imports: [CommonModule, ApplicantSidebarComponent],
  templateUrl: './applicant-job-view.component.html',
  styleUrls: ['./applicant-job-view.component.css']
})
export class ApplicantJobViewComponent implements OnInit {
  job: any;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const jobData = localStorage.getItem('selectedJob');
    if (jobData) {
      this.job = JSON.parse(jobData);
    } else {
      console.error('No job data found in localStorage');
    }
    this.isLoading = false;
  }
}
