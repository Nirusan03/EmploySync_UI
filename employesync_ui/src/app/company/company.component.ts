import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component'; // Import Sidebar

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, SidebarComponent], // Include Sidebar
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  companyName = 'Ascentic AB';
  companyUrl = 'sales.vouch.global/ascenticse';
  companyLogo: string = 'assets/company-logo.png'; // Default image

  // Trigger file input when clicking the camera button
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Handle file selection and update image preview
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
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
