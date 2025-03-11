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
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatButtonModule, HttpClientModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed: boolean = false;
  userProfileImage: string = ""; // API will update this
  userName: string = ""; // API will update this
  organizationName: string = ""; // API will update this

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
        this.userProfileImage = data.profileImage;
        this.userName = data.name;
        this.organizationName = data.organization;
      },
      (error) => {
        console.error("Error fetching user data:", error);
        // Use default data in case of error
        this.userProfileImage = "https://via.placeholder.com/40";
        this.userName = "Default User";
        this.organizationName = "Default Organization";
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

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
