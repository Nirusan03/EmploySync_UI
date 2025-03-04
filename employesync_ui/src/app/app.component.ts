import { Component } from '@angular/core';
import { CompanyComponent } from './company/company.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CompanyComponent],
  template: `<app-company></app-company>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
