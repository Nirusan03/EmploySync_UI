import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mycompany',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mycompany.component.html',
  styleUrl: './mycompany.component.css'
})
export class MyCompanyComponent implements OnInit {
  company = {
    logo: '',
    name: 'Ascentic AB',
    url: 'ascenticse'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('https://randomuser.me/api/')
      .subscribe(response => {
        this.company.logo = response.results[0].picture.large;
      });
  }
}
