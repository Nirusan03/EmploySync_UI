import { Component, OnInit, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApplicantSidebarComponent } from '../applicant-sidebar/applicant-sidebar.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-applicant-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ApplicantSidebarComponent],
  templateUrl: './applicant-user-profile.component.html',
  styleUrls: ['./applicant-user-profile.component.css']
})
export class ApplicantUserProfileComponent implements OnInit, DoCheck {
  isEditMode = false;
  userId = '';
  skillsInput: string = '';

  profile = {
    profileImage: 'assets/images/profile.jpg',
    fullName: 'John Doe',
    jobTitle: 'Software Engineer',
    email: 'john@example.com',
    phone: '123-456-7890',
    location: 'City, Country',
    skills: ['Angular', 'TypeScript', 'Tailwind CSS'],
    lookingFor: {
      position: 'Senior Developer',
      location: 'Remote',
      jobType: 'Full-time',
      compensationExpectation: '$100k+',
      sector: 'Technology',
      desiredJob: 'Lead Developer'
    },
    experience: [
      { jobTitle: 'Developer', company: 'ABC Inc', startDate: '2019', endDate: '2021' }
    ],
    education: [
      { institution: 'XYZ University', degree: 'B.Sc.', fieldOfStudy: 'Computer Science', startDate: '2015', endDate: '2019' }
    ]
  };

  constructor(private http: HttpClient, private userService: UserService) {}

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
      this.profile.profileImage = user.profileImage || localStorage.getItem('profileImage') || 'https://via.placeholder.com/150';

      this.getCVDetails();
    } else {
      alert('User info not found. Please log in again.');
    }
  }

  ngDoCheck(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.profile.profileImage = user.profileImage || 'https://via.placeholder.com/150';
  }

  getCVDetails(): void {
    this.http.get(`http://127.0.0.1:3000/api/v1/users/${this.userId}/cv`).subscribe({
      next: (data: any) => {
        this.profile = {
          ...this.profile,
          ...data,
          lookingFor: {
            ...this.profile.lookingFor,
            ...data.lookingFor
          }
        };
        this.skillsInput = this.profile.skills?.join(', ') || '';
      },
      error: (err) => {
        console.error('Failed to fetch CV', err);
      }
    });
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

  createCv() {
    if (!this.userId) {
      alert('User ID not found. Please log in again.');
      return;
    }

    const payload = {
      user: this.userId,
      ...this.profile
    };

    this.http.post(`http://127.0.0.1:3000/api/v1/users/${this.userId}/cv`, payload).subscribe({
      next: (cvResponse: any) => {
        alert('CV created successfully!');
        this.isEditMode = false;

        const cvId = cvResponse?._id;
        if (cvId) {
          this.userService.updateUserCvId(this.userId, cvId).subscribe({
            next: () => console.log('User CV linked successfully.'),
            error: (err) => console.error('Failed to update user with CV ID', err)
          });
        }
      },
      error: (err) => {
        console.error('Failed to create CV', err);
        alert('Failed to create CV.');
      }
    });
  }

  updateCv() {
    if (!this.userId) {
      alert('User ID not found. Please log in again.');
      return;
    }

    const payload = {
      user: this.userId,
      ...this.profile
    };

    this.http.put(`http://127.0.0.1:3000/api/v1/users/${this.userId}/cv`, payload).subscribe({
      next: (cvResponse: any) => {
        alert('CV updated successfully!');
        this.isEditMode = false;
      },
      error: (err) => {
        console.error('Failed to update CV', err);
        alert('Failed to update CV.');
      }
    });
  }
}
