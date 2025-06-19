import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductCardComponent', () => {
    let component: ProductCardComponent;
    let fixture: ComponentFixture<ProductCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductCardComponent, RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductCardComponent);
        component = fixture.componentInstance;
        component.product = {
            name: 'Test',
            description: 'Test',
            imageUrl: '',
            price: 0,
        };
        component.productId = '1';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
