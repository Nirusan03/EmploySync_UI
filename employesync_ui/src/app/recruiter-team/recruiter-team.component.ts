import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';

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
    SidebarComponent
  ],
  templateUrl: './recruiter-team.component.html',
  styleUrls: ['./recruiter-team.component.css']
})
export class RecruiterTeamComponent implements OnInit {
  displayedColumns: string[] = ['name', 'role', 'email'];
  teamMembers: TeamMember[] = [];
  apiUrl: string = 'http://127.0.0.1:3000/api/v1/users';
  isLoading: boolean = false;
  recruiterRoleId: string = '67c3214d74f3d06251dd28c3'; // Only show this role

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTeamMembers();
  }

  fetchTeamMembers() {
    this.isLoading = true;

    this.http.get<TeamMember[]>(this.apiUrl).subscribe({
      next: (data) => {
        // Filter users with the specific recruiter role ID
        this.teamMembers = data
          .filter(member => member.role === this.recruiterRoleId)
          .map(member => ({
            _id: member._id,
            userName: member.userName,
            email: member.email,
            profileImage: member.profileImage,
            organization: member.organization,
            role: 'Recruiter' // Always show "Recruiter" as role
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
    console.log('Add new member clicked');
  }
}
