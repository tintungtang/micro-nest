import { bootstrapApplication } from '@angular/platform-browser';
import { OrderButtonComponent } from './order-button.component';

export { OrderButtonComponent };
export default OrderButtonComponent;

// Bootstrap function for standalone usage
export const bootstrapOrderButton = () => {
  return bootstrapApplication(OrderButtonComponent);
};
