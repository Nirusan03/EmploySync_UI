// src/app/services/company.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly STORAGE_KEY = 'companyData';

  private _companyName = 'Ascentic AB';
  private _companyUrl = 'sales.vouch.global/ascenticse';
  private _companyLogo = 'assets/company-logo.png';

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      this._companyName = parsed.companyName || this._companyName;
      this._companyUrl = parsed.companyUrl || this._companyUrl;
      this._companyLogo = parsed.companyLogo || this._companyLogo;
    }
  }

  private saveToStorage() {
    const data = {
      companyName: this._companyName,
      companyUrl: this._companyUrl,
      companyLogo: this._companyLogo
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
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
