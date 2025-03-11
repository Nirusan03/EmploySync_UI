import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface Job {
  _id: string;
  title: string;
  description: string;
  organization: string;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-recruiter-view-job',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule, 
    MatProgressSpinnerModule, 
    HttpClientModule, 
    SidebarComponent
  ],
  templateUrl: './recruiter-view-job.component.html',
  styleUrls: ['./recruiter-view-job.component.css']
})
export class RecruiterViewJobComponent implements OnInit {
  displayedColumns: string[] = ['title', 'shortlisted', 'selected', 'startDate', 'lastActivity'];
  jobs: Job[] = [];
  apiUrl: string = 'http://127.0.0.1:3000/api/v1/organization/67c2d88d86f598e77d91c631/jobs';
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    this.isLoading = true;

    this.http.get<Job[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.jobs = data.map(job => ({
          ...job,
          startDate: new Date(job.createdAt).toLocaleDateString(),
          lastActivity: '5 days ago',
          shortlisted: Math.floor(Math.random() * 10),
          selected: Math.floor(Math.random() * 5)
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching jobs:', error);
        alert('Failed to load job listings. Please try again later.');
        this.isLoading = false;
      }
    });
  }

  addNewJob() {
    console.log('Add new job clicked');
  }
}
