import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CartEventService {
    private readonly CART_EVENT = 'cart:add';

    getCartAddEvents(): Observable<any> {
        return fromEvent(window, this.CART_EVENT).pipe(
            map((event: Event) => (event as CustomEvent).detail)
        );
    }
}
