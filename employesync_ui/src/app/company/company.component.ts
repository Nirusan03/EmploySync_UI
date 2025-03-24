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
  companyLogo: string = 'assets/default-company.png';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // 1. Load from localStorage first (if any)
    const localData = localStorage.getItem('companyData');
    if (localData) {
      const parsed = JSON.parse(localData);
      this.companyName = parsed.companyName || '';
      this.companyUrl = parsed.companyUrl || '';
      this.companyLogo = parsed.companyLogo || 'assets/default-company.png';
    }

    // 2. Fetch org data from API and override if available
    const orgId = localStorage.getItem('organizationId');
    if (!orgId) return;

    this.http.get<any>(`http://127.0.0.1:3000/api/v1/organization/${orgId}`).subscribe({
      next: (org) => {
        this.companyName = org.name || this.companyName;
        this.companyUrl = org.url || this.companyUrl;
        this.companyLogo = org.image || this.companyLogo;
        this.saveToLocalStorage(); // Optional: sync localStorage after API fetch
      },
      error: (err) => {
        console.error('Failed to fetch organization data:', err);
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
        this.saveToLocalStorage(); // Save change
      };
      reader.readAsDataURL(file);
    }
  }

  saveToLocalStorage() {
    const data = {
      companyName: this.companyName,
      companyUrl: this.companyUrl,
      companyLogo: this.companyLogo
    };
    localStorage.setItem('companyData', JSON.stringify(data));
  }
}
