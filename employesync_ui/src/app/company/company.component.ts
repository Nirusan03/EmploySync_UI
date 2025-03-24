import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, SidebarComponent],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companyName: string = '';
  companyUrl: string = '';
  companyLogo: string = 'assets/default-company.png'; // fallback logo

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const orgId = localStorage.getItem('organizationId');
  
    if (!orgId) {
      console.warn('Organization ID not found in localStorage');
      return;
    }
  
    this.http.get<any>(`http://127.0.0.1:3000/api/v1/organization/${orgId}`).subscribe({
      next: (org) => {
        console.log('Fetched organization:', org);
        this.companyName = org.name || '';
        this.companyUrl = org.url || '';
        this.companyLogo = org.image || 'assets/default-company.png';
      },
      error: (err) => {
        console.error('Error fetching organization data:', err);
      }
    });
  }
  

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.companyLogo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
