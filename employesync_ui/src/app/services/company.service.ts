// src/app/services/company.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly STORAGE_KEY = 'companyData';
  private readonly API_BASE_URL = 'http://127.0.0.1:3000/api/v1/organization';

  private _companyName = 'Ascentic AB';
  private _companyUrl = 'sales.vouch.global/ascenticse';
  private _companyLogo = 'assets/company-logo.png';

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      this._companyName = parsed.companyName || this._companyName;
      this._companyUrl = parsed.companyUrl || this._companyUrl;
      this._companyLogo = parsed.companyLogo || this._companyLogo;
    }

    this.fetchOrganizationDetails(); // Fetch updated values on init
  }

  private saveToStorage() {
    const data = {
      companyName: this._companyName,
      companyUrl: this._companyUrl,
      companyLogo: this._companyLogo
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  async fetchOrganizationDetails() {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const organizationId = user.organization;
      if (!organizationId) throw new Error('No organization ID found.');

      const response: any = await firstValueFrom(this.http.get(`${this.API_BASE_URL}/${organizationId}`));

      // Update company values from API
      this._companyName = response.name || this._companyName;
      this._companyUrl = response.url || this._companyUrl;
      this._companyLogo = response.image || this._companyLogo;

      this.saveToStorage();
    } catch (error) {
      console.error('Error fetching organization data:', error);
    }
  }

  get companyName() {
    return this._companyName;
  }

  set companyName(value: string) {
    this._companyName = value;
    this.saveToStorage();
  }

  get companyUrl() {
    return this._companyUrl;
  }

  set companyUrl(value: string) {
    this._companyUrl = value;
    this.saveToStorage();
  }

  get companyLogo() {
    return this._companyLogo;
  }

  set companyLogo(value: string) {
    this._companyLogo = value;
    this.saveToStorage();
  }
}
