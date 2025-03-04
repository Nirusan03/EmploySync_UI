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
  userName: string = '';
  password: string = '';
  isLoading: boolean = false;
  apiUrl: string = 'http://127.0.0.1:3000/api/v1/auth'; // Dummy API Endpoint

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.isLoading = true;

    const loginData = {
      userName: this.userName,
      password: this.password
    };

    this.http.post(this.apiUrl, loginData).subscribe({
      next: (response) => {
        console.log('Login successful', response);
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
