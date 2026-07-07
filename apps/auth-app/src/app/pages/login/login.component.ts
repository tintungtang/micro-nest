import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MfeButtonComponent, MfeCardComponent } from 'shared-ui';
import { signIn } from 'hub';

@Component({
    selector: 'mfe-auth-login-page',
    standalone: true,
    imports: [CommonModule, FormsModule, MfeButtonComponent, MfeCardComponent],
    template: `
        <section class="container py-5" style="max-width: 420px">
            <mfe-ui-card title="Sign in" subtitle="Demo login — any username and password">
                <form (ngSubmit)="login()" #form="ngForm" class="d-flex flex-column gap-3 mt-2">
                    <div>
                        <label for="username" class="form-label">Username</label>
                        <input
                            id="username"
                            name="username"
                            class="form-control"
                            required
                            [(ngModel)]="username"
                            placeholder="jane.doe"
                        />
                    </div>
                    <div>
                        <label for="password" class="form-label">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            class="form-control"
                            required
                            [(ngModel)]="password"
                            placeholder="********"
                        />
                    </div>
                    <p class="text-danger mb-0" *ngIf="error">{{ error }}</p>
                    <mfe-ui-button type="submit" variant="primary">Sign in</mfe-ui-button>
                </form>
            </mfe-ui-card>
        </section>
    `
})
export class LoginComponent {
    username = '';
    password = '';
    error = '';

    constructor(private router: Router) {}

    login() {
        if (!this.username.trim() || !this.password) {
            this.error = 'Please enter a username and password.';
            return;
        }
        // Shared store: persists the session + profile and broadcasts auth:changed.
        signIn(this.username.trim());
        this.router.navigate(['/pages/dashboard']);
    }
}
