import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit {
  teamMembers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.teamMembers = data.map(user => ({
          name: user.name,
          email: user.email,
          role: Math.random() > 0.5 ? 'Admin' : 'Member',
          profileImage: 'https://via.placeholder.com/32',
          isOwner: false
        }));
      });
  }
}
