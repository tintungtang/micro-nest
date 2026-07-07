import { Injectable, NgZone, signal } from '@angular/core';
import { getProfile, isAuthenticated, MFE_EVENTS, signOut, UserProfile } from 'hub';

/**
 * Shell-side view of the authentication state.
 * The state itself lives in the shared store (localStorage) and is
 * written by the auth-app remote; this service just mirrors it into
 * an Angular signal by listening to the auth:changed custom event.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly profileSignal = signal<UserProfile | null>(
        isAuthenticated() ? getProfile() : null
    );

    /** The signed-in user's profile, or null when signed out. */
    readonly profile = this.profileSignal.asReadonly();

    constructor(zone: NgZone) {
        const refresh = () =>
            zone.run(() =>
                this.profileSignal.set(isAuthenticated() ? getProfile() : null)
            );
        window.addEventListener(MFE_EVENTS.authChanged, refresh);
        // Also react to changes made in other browser tabs.
        window.addEventListener('storage', refresh);
    }

    signOut(): void {
        signOut();
    }
}
