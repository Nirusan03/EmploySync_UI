import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CompanyService } from '../services/company.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, SidebarComponent],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  constructor(public companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.fetchOrganizationDetails();
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      // Use a temporary URL for preview
      const objectUrl = URL.createObjectURL(file);
      this.companyService.previewLogo = objectUrl;

      // Save only the filename to backend (assuming it's manually copied to assets/images/)
      this.companyService.companyLogo = file.name;
    }
  }

  async onSaveChanges(): Promise<void> {
    try {
      await this.companyService.updateOrganizationDetails();
      alert('Company details updated successfully!');
    } catch {
      alert('Failed to update company details.');
    }
  }

  onDiscardChanges(): void {
    this.companyService.fetchOrganizationDetails();
  }
}
