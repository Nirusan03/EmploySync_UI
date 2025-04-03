import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

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
  organizationName: string = '';
  userName: string = '';
  private userId: string = '';
  private organizationId: string = '';

  private readonly USER_API = 'http://127.0.0.1:3000/api/v1/users';
  private readonly ORG_API = 'http://127.0.0.1:3000/api/v1/organization';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');

    this.userId = userData._id || '';
    this.organizationId = userData.organization || '';
    this.userProfileImage = this.resolveImagePath(userData.profileImage || '');

    this.userName = userData.userName || 'Default User';

    await this.loadOrganizationName(this.organizationId);
  }

  async loadOrganizationName(orgId: string) {
    try {
      const response: any = await firstValueFrom(
        this.http.get(`${this.ORG_API}/${orgId}`)
      );
      this.organizationName = response.name || 'Organization';
    } catch (error) {
      console.error('Failed to fetch organization name', error);
      this.organizationName = 'Organization';
    }
  }

  resolveImagePath(image: string): string {
    return image.startsWith('/assets') ? image : image;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  selectProfileImage() {
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

          await firstValueFrom(this.http.put(this.USER_API, payload));

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

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
