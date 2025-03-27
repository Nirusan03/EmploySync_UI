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

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userProfileImage = user.profileImage || 'https://via.placeholder.com/40';
    this.userName = user.userName || 'Default User';
    this.organizationName = localStorage.getItem('organizationName') || 'DigiRecruitez';
  }
  

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  selectProfileImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result as string;
          this.userProfileImage = imageData;
  
          localStorage.setItem('profileImage', imageData);
  
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          user.profileImage = imageData;
          localStorage.setItem('user', JSON.stringify(user));
        };
        reader.readAsDataURL(file);
      }
    });
    input.click();
  }
  

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  navigateTo(route: string) {
    if (this.isAuthenticated()) {
      this.router.navigate([route]);
    } else {
      alert('You need to log in first.');
      this.router.navigate(['/login']);
    }
  }

  goToUserProfile() {
    this.navigateTo('/user-profile');
  }
}
