import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  onSubmit() {
    console.log('Logging in with:', this.email, this.password);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
