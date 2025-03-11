import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component'; // Import SidebarComponent

interface TeamMember {
  name: string;
  role: string;
  email: string;
  imageUrl: string;
  isOwner?: boolean;
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
    HttpClientModule, 
    SidebarComponent // Include SidebarComponent
  ],
  templateUrl: './recruiter-team.component.html',
  styleUrls: ['./recruiter-team.component.css']
})
export class RecruiterTeamComponent implements OnInit {
  displayedColumns: string[] = ['name', 'role', 'email'];
  teamMembers: TeamMember[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTeamMembers();
  }

  fetchTeamMembers() {
    this.http.get<TeamMember[]>('http://localhost:5000/api/team-members').subscribe(
      (data) => {
        this.teamMembers = data;
      },
      (error) => {
        console.error('Error fetching team members:', error);
      }
    );
  }

  addNewMember() {
    console.log('Add new member clicked');
  }
}
