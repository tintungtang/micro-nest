import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedButtonComponent } from 'shared/ButtonComponent';
import { SharedInputComponent } from 'shared/InputComponent';

@Component({
  standalone: true,
  selector: 'mfe-auth-login-page',
  imports: [CommonModule, FormsModule, SharedButtonComponent, SharedInputComponent],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <shared-input placeholder="Username" [(ngModel)]="username" name="username"></shared-input>
      <shared-input placeholder="Password" type="password" [(ngModel)]="password" name="password"></shared-input>
      <shared-button>Login</shared-button>
    </form>
  `,
})
export class LoginComponent {
  username = '';
  password = '';
  constructor(private router: Router) {}
  login() {
    // simple demo login: store role in localStorage
    localStorage.setItem('userRole', 'officer');
    this.router.navigate(['/dashboard']);
  }
}
