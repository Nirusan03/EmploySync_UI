import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent],
  template: `<app-sidebar></app-sidebar>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
