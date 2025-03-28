import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ Import RouterModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule], // ✅ Add RouterModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  isLoading: boolean = false;
  apiUrl: string = 'http://127.0.0.1:3000/api/v1/auth';

  readonly RECRUITER_ROLE_ID = '67c3214d74f3d06251dd28c3';

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
        const token = response.token;
        const role = user.role;
        const organizationId = user.organization;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        localStorage.setItem('userName', user.userName || 'Default User');
        localStorage.setItem('profileImage', user.profileImage || 'assets/default-user.png');

        const roleId = role?._id || null;
        const roleName = role?.name?.toLowerCase() || 'applicant';
        localStorage.setItem('role', roleName);

        if (roleId === this.RECRUITER_ROLE_ID && organizationId) {
          localStorage.setItem('organizationId', organizationId);
          this.http.get<any>(`http://127.0.0.1:3000/api/v1/organization/${organizationId}`).subscribe({
            next: (orgResponse) => {
              localStorage.setItem('organizationName', orgResponse.name || 'Default Organization');
              this.redirectUser(roleName);
            },
            error: () => {
              localStorage.setItem('organizationName', 'Default Organization');
              this.redirectUser(roleName);
            }
          });
        } else {
          localStorage.setItem('organizationName', 'Independent User');
          this.redirectUser(roleName);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.');
        this.isLoading = false;
      }
    });
  }

  redirectUser(roleName: string) {
    this.isLoading = false;
    if (roleName === 'recruiter') {
      this.router.navigate(['/company']);
    } else {
      this.router.navigate(['/apply-job']);
    }
  }
}
