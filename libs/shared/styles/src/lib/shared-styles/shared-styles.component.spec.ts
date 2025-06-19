import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedStylesComponent } from './shared-styles.component';

describe('SharedStylesComponent', () => {
    let component: SharedStylesComponent;
    let fixture: ComponentFixture<SharedStylesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedStylesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SharedStylesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
