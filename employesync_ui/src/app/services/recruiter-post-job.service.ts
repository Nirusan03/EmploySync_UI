import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruiterPostJobService {
  private apiBaseUrl = 'http://127.0.0.1:3000/api/v1/organization';
  jobData: any = {
    title: '',
    description: '',
    jobType: '',
    salaryPerHour: 0,
    yearOfExperience: 0,
    skills: [],
    responsibilities: [],
    screeningQuestions: [],
    organization: ''
  };

  constructor(private http: HttpClient) {}

  updateJobData(updated: any) {
    this.jobData = { ...this.jobData, ...updated };
  }

  getJobData() {
    return this.jobData;
  }

  postJob(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const organizationId = user.organization;
    if (!organizationId) throw new Error('No organization ID found.');

    this.jobData.organization = organizationId;

    const payload = {
      title: this.jobData.title,
      description: this.jobData.description,
      jobType: this.jobData.jobType,
      salaryPerHour: this.jobData.salaryPerHour,
      yearOfExperience: this.jobData.yearOfExperience,
      skills: this.jobData.skills,
      responsibilities: this.jobData.responsibilities,
      organization: this.jobData.organization
    };

    return this.http.post(`${this.apiBaseUrl}/${organizationId}/jobs`, payload);
  }
}
