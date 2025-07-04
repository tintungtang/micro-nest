import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'mfe-auth-login-page',
    imports: [CommonModule, FormsModule],
    template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">

    </form>
  `
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
