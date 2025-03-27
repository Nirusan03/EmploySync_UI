import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // <-- updated
import { HttpClient } from '@angular/common/http';
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
  jobId: string = '';
  job: any;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router // <-- added
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['jobId'];
    this.fetchJobDetails();
  }

  fetchJobDetails() {
    const jobData = localStorage.getItem('selectedJob');
    if (jobData) {
      this.job = JSON.parse(jobData);
      this.isLoading = false;
    } else {
      console.error('No job data found in localStorage.');
      this.isLoading = false;
    }
  }

  handlePass() {
    this.router.navigate(['/apply-job']); // adjust the route if needed
  }
}
