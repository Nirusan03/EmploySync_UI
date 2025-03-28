import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  agreeToTerms: boolean = false;
  role: string = 'applicant';
  organizationId: string = '';
  isLoading: boolean = false;

  readonly APPLICANT_ROLE_ID = '67c2a9cb98f01636ab47b7b2';
  readonly RECRUITER_ROLE_ID = '67c3214d74f3d06251dd28c3';

  apiUrl: string = 'http://127.0.0.1:3000/api/v1/users';

  constructor(private http: HttpClient, private router: Router) {}

  toggleRole(selectedRole: string) {
    this.role = selectedRole;
  }

  onSubmit() {
    if (!this.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    if (this.role === 'recruiter' && !this.organizationId) {
      alert('Please provide Organization ID for recruiter.');
      return;
    }

    this.isLoading = true;

    const userData: any = {
      userName: `${this.firstName}${this.lastName}`.toLowerCase(),
      email: this.email,
      password: this.password,
      profileImage: 'https://via.placeholder.com/150',
      role: this.role === 'recruiter' ? this.RECRUITER_ROLE_ID : this.APPLICANT_ROLE_ID,
      appliedjobs: [],
      shortlistedjobs: []
    };    

    if (this.role === 'recruiter') {
      userData.organization = this.organizationId;
    }

    this.http.post(this.apiUrl, userData).subscribe({
      next: (response: any) => {
        alert('Sign-up successful!');
        this.isLoading = false;
        this.router.navigate([this.role === 'recruiter' ? '/company' : '/apply-job']);
      },
      error: (error) => {
        console.error('Sign-up failed', error);
        alert('Sign-up failed. Please try again.');
        this.isLoading = false;
      }
    });
  }
}
