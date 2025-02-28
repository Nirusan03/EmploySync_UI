import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobslist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobslist.component.html',
  styleUrl: './jobslist.component.css'
})
export class JobsListComponent implements OnInit {
  jobs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Dummy API call
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.jobs = data.slice(0, 10).map((user, index) => ({
          id: `31000-001240${3742 + index}`,
          title: user.company.name || 'Unknown Job',
          shortlisted: Math.floor(Math.random() * 11), // Random between 0-10
          selected: Math.floor(Math.random() * 4), // Random between 0-3
          startDate: '8/17/2022',
          lastActivity: '5 days ago'
        }));
      });
  }
}
