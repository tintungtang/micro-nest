import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MfeButtonComponent } from './mfe-button.component';

describe('MfeButtonComponent', () => {
    let component: MfeButtonComponent;
    let fixture: ComponentFixture<MfeButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MfeButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MfeButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
