import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
  
    const loginData = {
      userName: this.userName,
      password: this.password
    };
  
    this.http.post(this.apiUrl, loginData).subscribe({
      next: (response: any) => {
        const user = response.user;
        const organizationId = user.organization;
  
        // Save token and user details
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userName', user.userName || 'Default User');
        localStorage.setItem('profileImage', user.profileImage || 'assets/default-user.png');
        localStorage.setItem('organizationId', organizationId); // CRUCIAL
  
        // Fetch organization details and store name (optional use in sidebar)
        this.http.get<any>(`http://127.0.0.1:3000/api/v1/organization/${organizationId}`).subscribe({
          next: (orgResponse) => {
            localStorage.setItem('organizationName', orgResponse.name || 'Default Organization');
  
            this.isLoading = false;
            this.router.navigate(['/company']);
          },
          error: (orgError) => {
            console.error('Failed to fetch organization name', orgError);
  
            localStorage.setItem('organizationName', 'Default Organization');
            this.isLoading = false;
            this.router.navigate(['/company']);
          }
        });
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.');
        this.isLoading = false;
      }
    });
  }  
}
