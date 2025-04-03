import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApplicantNotificationComponent } from '../applicant-notification/applicant-notification.component';
import { UserService } from '../services/user.service';

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
    HttpClientModule,
    MatDialogModule
  ],
  templateUrl: './applicant-sidebar.component.html',
  styleUrls: ['./applicant-sidebar.component.css']
})
export class ApplicantSidebarComponent implements OnInit {
  isCollapsed: boolean = false;
  userProfileImage: string = '';
  userName: string = '';
  organizationName: string = '';
  hasShortlistNotifications: boolean = false;
  shortlistedJobs: string[] = [];

  constructor(private router: Router, private dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserData();
    this.checkShortlistedStatus();
  }

  loadUserData(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = storedUser.userName || localStorage.getItem('userName') || 'Default User';
    this.organizationName = localStorage.getItem('organizationName') || 'Independent User';
    this.userProfileImage =
      storedUser.profileImage || localStorage.getItem('profileImage') || 'https://via.placeholder.com/150';
  }

  checkShortlistedStatus(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const shortlisted = user.shortlistedjobs || [];

    if (shortlisted.length > 0) {
      this.hasShortlistNotifications = true;
      this.shortlistedJobs = shortlisted;
    }
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

          const user = JSON.parse(localStorage.getItem('user') || '{}');
          user.profileImage = base64Image;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('profileImage', base64Image);

          // Update in backend
          if (user._id) {
            this.userService.updateUserProfileImage(user._id, base64Image).subscribe({
              next: () => console.log('Profile image updated on server.'),
              error: (err) => console.error('Image update failed', err)
            });
          }
        };
        reader.readAsDataURL(file);
      }
    });

    input.click();
  }

  openShortlistPopup(): void {
    this.dialog.open(ApplicantNotificationComponent, {
      width: '400px',
      data: { jobs: this.shortlistedJobs }
    });
  }
  logout() {
    localStorage.clear(); // Clear all localStorage items
    this.router.navigate(['/login']); // Redirect to login page
  }
  
}
