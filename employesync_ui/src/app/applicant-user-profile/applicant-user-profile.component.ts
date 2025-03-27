import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApplicantSidebarComponent } from '../applicant-sidebar/applicant-sidebar.component';

@Component({
  selector: 'app-applicant-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ApplicantSidebarComponent],
  templateUrl: './applicant-user-profile.component.html',
  styleUrls: ['./applicant-user-profile.component.css']
})
export class ApplicantUserProfileComponent implements OnInit {
  isEditMode = false;
  userId = '';
  skillsInput: string = '';

  profile: any = {
    fullName: '',
    jobTitle: '',
    location: '',
    email: '',
    phone: '',
    skills: [],
    lookingFor: {
      location: '',
      position: '',
      jobType: '',
      compensationExpectation: '',
      sector: '',
      desiredJob: ''
    },
    experience: [],
    education: [],
    profileImage: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userId = user._id;
  
      if (!this.userId) {
        alert('User ID not found. Please log in again.');
        return;
      }
  
      this.profile.fullName = user.userName;
      this.profile.email = user.email;
      this.profile.profileImage = user.profileImage || '';
    } else {
      alert('User info not found. Please log in again.');
    }
  
    this.skillsInput = this.profile.skills?.join(', ') || '';
  }  

  toggleEdit() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.skillsInput = this.profile.skills?.join(', ') || '';
  }

  onSkillsChange(event: string) {
    this.skillsInput = event;
    this.profile.skills = event.split(',').map(skill => skill.trim()).filter(Boolean);
  }

  saveProfile() {
    if (!this.userId) {
      alert('User ID not found. Please log in again.');
      return;
    }

    const payload = {
      user: this.userId,
      ...this.profile
    };

    this.http.post(`http://127.0.0.1:3000/api/v1/users/${this.userId}/cv`, payload).subscribe({
      next: () => {
        alert('Profile saved successfully!');
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('Failed to save profile', err);
        alert('Failed to save profile.');
      }
    });
  }
}
