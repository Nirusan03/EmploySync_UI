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
  selector: 'app-sidebar',
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
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed: boolean = false;
  userProfileImage: string = '';
  userName: string = '';
  organizationName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    // Load from localStorage every time component initializes
    const storedProfile = localStorage.getItem('profileImage');
    const storedName = localStorage.getItem('userName');
    const storedOrg = localStorage.getItem('organizationName');

    this.userProfileImage = storedProfile || 'https://via.placeholder.com/40';
    this.userName = storedName || 'Default User';
    this.organizationName = storedOrg || 'Default Organization';
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
          localStorage.setItem('profileImage', imageData); // Save for persistent use
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
}
