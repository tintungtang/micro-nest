const CART_KEY = 'cartItems';

export function defineOrderButtonElement() {
  class OrderButtonElement extends HTMLElement {
    private count = 0;
    private countElement?: HTMLElement;
    private eventHandler?: EventListener;

    connectedCallback() {
      this.render();
      this.setupEventListeners();
      this.loadCartCount();
    }

    disconnectedCallback() {
      if (this.eventHandler) {
        window.removeEventListener('cart:add', this.eventHandler);
      }
    }

    private render() {
      this.innerHTML = `
        <a class="p-2 mx-1 position-relative mfe-order-button-link" 
           style="cursor: pointer; text-decoration: none; color: inherit;">
          <svg width="24" height="24">
            <use xlink:href="#shopping-bag"></use>
          </svg>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                id="order-count" style="display: none; font-size: 0.75rem;">
            0
          </span>
        </a>
      `;

      this.countElement = this.querySelector('#order-count') as HTMLElement;
    }

    private setupEventListeners() {
      // Listen for cart:add custom events
      this.eventHandler = (event: Event) => {
        const customEvent = event as CustomEvent;
        const items = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        items.push(customEvent.detail);
        localStorage.setItem(CART_KEY, JSON.stringify(items));
        this.updateCount(items.length);
      };

      window.addEventListener('cart:add', this.eventHandler);

      // Handle click to navigate to orders
      const linkElement = this.querySelector('a');
      if (linkElement) {
        linkElement.addEventListener('click', (e) => {
          e.preventDefault();
          this.navigateToOrders();
        });
      }

      // Handle hover effect
      if (linkElement) {
        linkElement.addEventListener('mouseenter', () => {
          linkElement.style.color = '#007bff';
        });
        linkElement.addEventListener('mouseleave', () => {
          linkElement.style.color = 'inherit';
        });
      }
    }

    private loadCartCount() {
      const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      this.updateCount(stored.length);
    }

    private updateCount(newCount: number) {
      this.count = newCount;
      if (this.countElement) {
        this.countElement.textContent = newCount.toString();
        this.countElement.style.display = newCount > 0 ? 'block' : 'none';
      }
    }

    private navigateToOrders() {
      console.log('Navigate to orders page');
      
      // Dispatch custom event to notify the host
      const event = new CustomEvent('mfe-order:navigate', {
        detail: { path: '/pages/orders' },
        bubbles: true
      });
      window.dispatchEvent(event);

      // Also try direct navigation if we're in the storefront context
      if (window.location.pathname.includes('storefront') || window.location.port === '4200') {
        try {
          window.location.href = '/pages/orders';
        } catch (e) {
          console.log('Direct navigation failed, using custom event only');
        }
      }
    }
  }

  if (!customElements.get('mfe-cart-button')) {
    customElements.define('mfe-cart-button', OrderButtonElement);
  }
}

// Auto-define the element when this module is imported
defineOrderButtonElement();

export default defineOrderButtonElement; 