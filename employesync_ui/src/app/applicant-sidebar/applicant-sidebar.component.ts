import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApplicantNotificationComponent } from '../applicant-notification/applicant-notification.component';

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
  headerUserName: string = '';
  hasShortlistNotifications: boolean = false;
  shortlistedJobs: string[] = [];
  private userId: string = '';

  private readonly USER_API = 'http://127.0.0.1:3000/api/v1/users';

  constructor(private router: Router, private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUserData();
    this.checkShortlistedStatus();
  }

  loadUserData(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    this.userId = storedUser._id || '';
    this.userName = storedUser.userName || 'Digital Recruiterz';
    this.headerUserName = this.userName;
    this.userProfileImage = this.resolveImagePath(storedUser.profileImage || 'https://via.placeholder.com/150');
  }

  resolveImagePath(image: string): string {
    return image.startsWith('/assets') ? image : image;
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

    input.addEventListener('change', async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        this.userProfileImage = objectUrl;

        const fileName = file.name;
        const finalImagePath = `/assets/images/${fileName}`;

        try {
          const payload = {
            userId: this.userId,
            profileImage: finalImagePath
          };

          await this.http.put(this.USER_API, payload).toPromise();

          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          currentUser.profileImage = finalImagePath;
          localStorage.setItem('user', JSON.stringify(currentUser));

          this.userProfileImage = finalImagePath;
        } catch (err) {
          alert('Failed to update profile image');
          console.error(err);
        }
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

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
