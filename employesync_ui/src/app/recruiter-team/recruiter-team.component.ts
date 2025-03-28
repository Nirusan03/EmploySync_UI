import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

interface TeamMember {
  _id: string;
  userName: string;
  email: string;
  profileImage: string;
  organization: string;
  role: string;
}

@Component({
  selector: 'app-recruiter-team',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    SidebarComponent,
    RouterModule
  ],
  templateUrl: './recruiter-team.component.html',
  styleUrls: ['./recruiter-team.component.css']
})
export class RecruiterTeamComponent implements OnInit {
  displayedColumns: string[] = ['name', 'role', 'email'];
  teamMembers: TeamMember[] = [];
  apiUrl: string = 'http://127.0.0.1:3000/api/v1/users';
  isLoading: boolean = false;
  recruiterRoleId: string = '67c3214d74f3d06251dd28c3';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTeamMembers();
  }

  fetchTeamMembers() {
    this.isLoading = true;
    const orgId = localStorage.getItem('organizationId');

    if (!orgId) {
      console.error('Organization ID not found in localStorage.');
      this.isLoading = false;
      return;
    }

    this.http.get<TeamMember[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.teamMembers = data
          .filter(member =>
            member.role === this.recruiterRoleId &&
            member.organization === orgId
          )
          .map(member => ({
            _id: member._id,
            userName: member.userName,
            email: member.email,
            profileImage: member.profileImage,
            organization: member.organization,
            role: 'Recruiter'
          }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching team members:', error);
        alert('Failed to load team members. Please try again later.');
        this.isLoading = false;
      }
    });
  }

  addNewMember() {
    // Redundant now; handled with routerLink
  }
}
