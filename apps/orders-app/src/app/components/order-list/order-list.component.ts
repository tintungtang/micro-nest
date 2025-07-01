import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'mfe-order-order-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-list.component.html',
    styleUrl: './order-list.component.css',
})
export class OrderListComponent {
    orders = [
        {
            name: 'Alice Nguyen',
            address: '123 Le Loi, District 1',
            avatar: 'https://i.pravatar.cc/80?img=5',
            total: 22.5,
            items: ['1x Salmon Sushi', '1x Matcha Tea'],
        },
        {
            name: 'Bob Tran',
            address: '456 Phan Xich Long, Phu Nhuan',
            avatar: 'https://i.pravatar.cc/80?img=8',
            total: 18.0,
            items: ['1x Margherita Pizza', '1x Coke'],
        },
        {
            name: 'Chi Le',
            address: '789 Nguyen Hue, District 3',
            avatar: 'https://i.pravatar.cc/80?img=11',
            total: 12.75,
            items: ['1x Milk Tea', '1x Fried Tofu'],
        },
    ];
}
