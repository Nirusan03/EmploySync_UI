import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruiterPostJobService {
  private apiUrl = 'http://127.0.0.1:3000/api/v1/organization/67c2d88d86f598e77d91c631/jobs';

  jobData: any = {
    title: '',
    description: '',
    location: 'Remote',
    salary: null,
    status: 'open'
  };

  constructor(private http: HttpClient) {}

  updateJobData(updatedData: any) {
    this.jobData = { ...this.jobData, ...updatedData };
  }

  getJobData() {
    return this.jobData;
  }

  postJob(): Observable<any> {
    // Ensure only the required API fields are sent
    const payload = {
      title: this.jobData.title,
      description: this.jobData.description,
      location: this.jobData.location,
      salary: this.jobData.salary,
      status: this.jobData.status
    };
    return this.http.post(this.apiUrl, payload);
  }
}
