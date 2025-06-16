import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { SharedButtonComponent } from 'shared/ButtonComponent';

@Component({
  standalone: true,
    imports: [ NxWelcomeComponent, RouterModule, SharedButtonComponent ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Storefront';
}
