import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for redirection

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  isLoading: boolean = false;
  apiUrl: string = 'http://127.0.0.1:3000/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) {} // Inject Router

  onSubmit() {
    this.isLoading = true;
  
    const loginData = {
      userName: this.userName,
      password: this.password
    };
  
    this.http.post(this.apiUrl, loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
  
        // Store token in localStorage
        // Assuming the API sends a token
        localStorage.setItem('authToken', response.token); 
  
        // Redirect to company page
        this.isLoading = false;
        this.router.navigate(['/company']); 
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.');
        this.isLoading = false;
      }
    });
  }  
}