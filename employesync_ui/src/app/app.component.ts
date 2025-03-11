import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="app-container">
      <div class="content-container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
