import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchUserData();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  fetchUserData() {
    // Dummy Node.js API call (Replace with your real API later)
    this.http.get<any>('http://localhost:5000/api/user-profile').subscribe(
      (data) => {
        this.userProfileImage = data.profileImage || 'https://via.placeholder.com/40';
        this.userName = data.name || 'Default User';
        this.organizationName = data.organization || 'Default Organization';
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.userProfileImage = 'https://via.placeholder.com/40';
        this.userName = 'Default User';
        this.organizationName = 'Default Organization';
      }
    );
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
          this.userProfileImage = reader.result as string;
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
