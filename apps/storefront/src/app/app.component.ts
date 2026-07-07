import { Component, NgZone, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MFE_EVENTS } from 'hub';

@Component({
    imports: [RouterModule],
    selector: 'mfe-storefront-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title = 'Storefront';

  // Remotes ask for navigation via the mfe:navigate custom event so they
  // stay decoupled from the shell router.
  private readonly onNavigate = (event: Event) => {
      const url = (event as CustomEvent<string>).detail;
      if (url) {
          this.zone.run(() => this.router.navigateByUrl(url));
      }
  };

  constructor(private readonly router: Router, private readonly zone: NgZone) {
      window.addEventListener(MFE_EVENTS.navigate, this.onNavigate);
  }

  ngOnDestroy(): void {
      window.removeEventListener(MFE_EVENTS.navigate, this.onNavigate);
  }
}
