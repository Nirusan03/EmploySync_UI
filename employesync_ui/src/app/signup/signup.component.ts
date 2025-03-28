import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  organizationId: string = '';
  agreeToTerms: boolean = false;
  role: string = 'applicant';
  isLoading: boolean = false;

  readonly RECRUITER_ROLE_ID = '67c3214d74f3d06251dd28c3';
  readonly APPLICANT_ROLE_ID = '67c2a9cb98f01636ab47b7b2';

  apiUrl: string = 'http://127.0.0.1:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  toggleRole(selectedRole: string) {
    this.role = selectedRole;
  }

  onSubmit() {
    if (!this.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    this.isLoading = true;

    const userName = `${this.firstName} ${this.lastName}`;
    const payload: any = {
      userName,
      email: this.email,
      password: this.password,
      profileImage: 'https://example.com/default-user.png',
      appliedjobs: [],
      shortlistedjobs: [],
      role: this.role === 'recruiter' ? this.RECRUITER_ROLE_ID : this.APPLICANT_ROLE_ID
    };

    if (this.role === 'recruiter') {
      if (!this.organizationId.trim()) {
        alert('Organization ID is required for recruiters.');
        this.isLoading = false;
        return;
      }
      payload.organization = this.organizationId;
    }

    this.http.post(this.apiUrl, payload).subscribe({
      next: () => {
        alert('Signup successful!');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Signup failed:', err);
        alert('Signup failed. Please try again.');
        this.isLoading = false;
      }
    });
  }
}
