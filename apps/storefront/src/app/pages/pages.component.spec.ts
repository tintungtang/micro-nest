import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PagesComponent } from './pages.component';

describe('PagesComponent', () => {
    let component: PagesComponent;
    let fixture: ComponentFixture<PagesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PagesComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(PagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
