import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
    MfeBadgeComponent,
    MfeButtonComponent,
    MfeCardComponent,
    MfeHeaderComponent,
} from 'shared-ui';
import { getProfile, signOut, updateProfile, UserProfile } from 'hub';

@Component({
    selector: 'mfe-auth-profile-page',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MfeBadgeComponent,
        MfeButtonComponent,
        MfeCardComponent,
        MfeHeaderComponent,
    ],
    template: `
        <section class="container py-4" style="max-width: 720px">
            <mfe-ui-header title="My account" subtitle="Your information and preferences">
                <mfe-ui-button variant="secondary" (clicked)="onSignOut()">Sign out</mfe-ui-button>
            </mfe-ui-header>

            <div class="d-flex flex-column gap-4" *ngIf="profile">
                <mfe-ui-card title="User information">
                    <dl class="row mb-0">
                        <dt class="col-sm-3">Username</dt>
                        <dd class="col-sm-9">
                            {{ profile.username }}
                            <mfe-ui-badge variant="success" class="ms-1">Signed in</mfe-ui-badge>
                        </dd>
                        <dt class="col-sm-3">Full name</dt>
                        <dd class="col-sm-9">{{ profile.fullName || '—' }}</dd>
                        <dt class="col-sm-3">Email</dt>
                        <dd class="col-sm-9">{{ profile.email || '—' }}</dd>
                        <dt class="col-sm-3">Phone</dt>
                        <dd class="col-sm-9">{{ profile.phone || '—' }}</dd>
                        <dt class="col-sm-3">Address</dt>
                        <dd class="col-sm-9 mb-0">{{ profile.address || '—' }}</dd>
                    </dl>
                </mfe-ui-card>

                <mfe-ui-card title="Update profile">
                    <form (ngSubmit)="save()" class="d-flex flex-column gap-3 mt-2">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="fullName" class="form-label">Full name</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    class="form-control"
                                    [(ngModel)]="draft.fullName"
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="email" class="form-label">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    class="form-control"
                                    [(ngModel)]="draft.email"
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="phone" class="form-label">Phone</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    class="form-control"
                                    [(ngModel)]="draft.phone"
                                />
                            </div>
                            <div class="col-md-6">
                                <label for="address" class="form-label">Address</label>
                                <input
                                    id="address"
                                    name="address"
                                    class="form-control"
                                    [(ngModel)]="draft.address"
                                />
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <mfe-ui-button type="submit" variant="primary">Save changes</mfe-ui-button>
                            <mfe-ui-badge variant="success" *ngIf="saved">Profile updated!</mfe-ui-badge>
                        </div>
                    </form>
                </mfe-ui-card>
            </div>
        </section>
    `
})
export class ProfileComponent implements OnInit {
    profile: UserProfile | null = null;
    draft: Pick<UserProfile, 'fullName' | 'email' | 'phone' | 'address'> = {
        fullName: '',
        email: '',
        phone: '',
        address: '',
    };
    saved = false;

    constructor(private readonly router: Router) {}

    ngOnInit(): void {
        this.profile = getProfile();
        if (this.profile) {
            const { fullName, email, phone, address } = this.profile;
            this.draft = { fullName, email, phone, address };
        }
    }

    save(): void {
        this.profile = updateProfile(this.draft);
        this.saved = true;
        setTimeout(() => (this.saved = false), 2000);
    }

    onSignOut(): void {
        signOut();
        this.router.navigate(['/auth/login']);
    }
}
