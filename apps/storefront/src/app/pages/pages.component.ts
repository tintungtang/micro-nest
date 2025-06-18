import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/store-header/header.component';
import { FooterComponent } from '../components/store-footer/footer.component';

@Component({
    selector: 'app-pages',
    standalone: true,
    imports: [ CommonModule, RouterOutlet, HeaderComponent, FooterComponent ],
    templateUrl: './pages.component.html',
    styleUrl: './pages.component.css',
})
export class PagesComponent {}
