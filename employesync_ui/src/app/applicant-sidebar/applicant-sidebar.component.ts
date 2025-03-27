import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './applicant-sidebar.component.html',
  styleUrls: ['./applicant-sidebar.component.css']
})
export class ApplicantSidebarComponent implements OnInit {
  isCollapsed: boolean = false;
  userProfileImage: string = '';
  userName: string = '';
  organizationName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    this.userName = storedUser.userName || localStorage.getItem('userName') || 'Default User';
    this.organizationName = localStorage.getItem('organizationName') || 'Independent User';

    // Profile image: check user object first, then localStorage
    this.userProfileImage =
      storedUser.profileImage ||
      localStorage.getItem('profileImage') ||
      'https://via.placeholder.com/150';
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(route: string): void {
    const isLoggedIn = !!localStorage.getItem('authToken');
    if (isLoggedIn) {
      this.router.navigate([route]);
    } else {
      alert('You need to log in first.');
      this.router.navigate(['/login']);
    }
  }

  goToUserProfile(): void {
    this.navigateTo('/user-profile');
  }

  selectProfileImage(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string;
          this.userProfileImage = base64Image;

          // Save to localStorage and update the user object
          localStorage.setItem('profileImage', base64Image);

          const user = JSON.parse(localStorage.getItem('user') || '{}');
          user.profileImage = base64Image;
          localStorage.setItem('user', JSON.stringify(user));
        };
        reader.readAsDataURL(file);
      }
    });

    input.click();
  }
}
