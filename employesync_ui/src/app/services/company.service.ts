import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly API_BASE_URL = 'http://127.0.0.1:3000/api/v1/organization';

  organizationId = '';
  companyName = '';
  companyUrl = '';
  companyLogo = '';       // Only stores the filename e.g. "logo.png"
  previewLogo = '';       // Full path for <img> tag e.g. "/assets/images/logo.png"

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.organizationId = user.organization || '';
  }

  async fetchOrganizationDetails() {
    try {
      const response: any = await firstValueFrom(
        this.http.get(`${this.API_BASE_URL}/${this.organizationId}`)
      );

      this.companyName = response.name || '';
      this.companyUrl = response.url || '';
      this.companyLogo = response.image || '';

      // Construct preview path if image is valid
      this.previewLogo = this.companyLogo.includes('/assets/')
      ? this.companyLogo
      : `/assets/images/${this.companyLogo}`;
    // fallback image
    } catch (error) {
      console.error('Error fetching organization data:', error);
    }
  }

  async updateOrganizationDetails() {
    const payload = {
      name: this.companyName,
      url: this.companyUrl,
      image: this.companyLogo, // only the filename like "logo.png"
    };

    try {
      return await firstValueFrom(
        this.http.put(`${this.API_BASE_URL}/${this.organizationId}`, payload)
      );
    } catch (error) {
      console.error('Error updating organization:', error);
      throw error;
    }
  }
}
