import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatIconModule } from '@angular/material/icon'; // ✅ Import MatIconModule

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule], // ✅ Add MatIconModule
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  companyName = 'Ascentic AB';
  companyUrl = 'sales.vouch.global/ascenticse';
  companyLogo = 'assets/company-logo.png';

  changeCompanyLogo() {
    console.log('Change Logo Clicked');
  }
}
