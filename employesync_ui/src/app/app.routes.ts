import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { CompanyComponent } from './company/company.component';

export const routes: Routes = [
  { path: '', redirectTo: 'company', pathMatch: 'full' },
  { path: 'company', component: CompanyComponent }
];

export const appRouting = provideRouter(routes);
