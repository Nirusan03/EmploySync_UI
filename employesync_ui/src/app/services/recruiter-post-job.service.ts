import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecruiterPostJobService {
  jobData: any = {
    jobTitle: '',
    position: 'Remote',
    jobType: 'Full-time',
    minEducation: '',
    salaryType: 'per Hour',
    salaryMin: 50,
    salaryMax: 1000,
    skills: [],
    experienceMin: 0,
    experienceMax: 10,
    screeningQuestions: [],
    jobDescription: ''
  };

  constructor() {}

  updateJobData(updatedData: any) {
    this.jobData = { ...this.jobData, ...updatedData };
  }

  getJobData() {
    return this.jobData;
  }
}
