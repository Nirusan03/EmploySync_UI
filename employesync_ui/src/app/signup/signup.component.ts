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
  agreeToTerms: boolean = false;
  role: string = 'applicant'; // Default role
  isLoading: boolean = false;
  apiUrl: string = 'http://localhost:5000/api/signup'; // Dummy API Endpoint

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

    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.http.post(this.apiUrl, userData).subscribe({
      next: (response) => {
        console.log('Sign-up successful', response);
        alert('Sign-up successful!');
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Sign-up failed', error);
        alert('Sign-up failed. Please try again.');
        this.isLoading = false;
      }
    });
  }
}
