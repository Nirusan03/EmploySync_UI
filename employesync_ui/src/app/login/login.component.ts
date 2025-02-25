import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  apiUrl: string = 'http://localhost:5000/api/login'; // Dummy API Endpoint

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.isLoading = true;

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post(this.apiUrl, loginData).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        alert('Login successful!');
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.');
        this.isLoading = false;
      }
    });
  }
}
