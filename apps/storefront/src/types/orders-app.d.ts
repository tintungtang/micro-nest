declare module 'orders-app/OrderButton' {
  import { ComponentType } from '@angular/core';
  
  export interface OrderButtonProps {
    buttonText?: string;
    orderCount?: number;
    variant?: 'primary' | 'outline';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    productId?: string;
    productName?: string;
    price?: number;
  }

  export interface OrderClickData {
    productId?: string;
    productName?: string;
    price?: number;
  }

  export interface OrderButtonInstance {
    buttonText: string;
    orderCount: number;
    variant: 'primary' | 'outline';
    size: 'small' | 'medium' | 'large';
    disabled: boolean;
    productId?: string;
    productName?: string;
    price?: number;
    orderClick: { subscribe: (callback: (data: OrderClickData) => void) => void };
  }
  
  export const OrderButtonComponent: ComponentType<OrderButtonInstance>;
  export const bootstrapOrderButton: () => Promise<unknown>;
  const _default: ComponentType<OrderButtonInstance>;
  export default _default;
}
