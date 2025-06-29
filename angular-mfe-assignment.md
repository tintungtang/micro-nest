
# Practical Micro Frontends Assignment

## Create and Integrate a new Angular MFE

---

## 🎯 Objective

Create a new Angular-based Micro Frontend (MFE) application and integrate it into the existing `micro-nest` monorepo structure using **Module Federation**.

Your task is to **add a new Angular MFE for Order Management** and **replace the existing CartButton with the new MFE’s component**.

---

## 📋 Assignment Requirements

### 1. Generate a New Angular Remote App

- **App name:** `orders-app`
- Use the Nx generator:
  ```bash
  nx g @nx/angular:remote orders-app --host=storefront
  ```
- Prefix selectors and styles with `mfe-order`

---

### 2. Develop the Order List UI

- Inside `orders-app`, create a component `OrderListComponent` displaying a static list of orders.
- Use provided template:
  ```
  templates/organic-1.0.0/orders.html
  ```

---

### 3. Expose Routes

- Create a routing file: `orders.routes.ts`
- Expose the route using the `ModuleFederationConfig`:

  ```ts
  exposes: {
    './Routes': './src/app/routes/orders.routes.ts',
    './OrderButton': './src/app/components/order-button.component.ts'
  }
  ```

---

### 4. Integrate with the Host (`storefront`)

- In `storefront`, load the remote `orders-app`:

  ```ts
  const config: ModuleFederationConfig = {
    name: 'storefront',
    remotes: [
      ['auth-app', 'http://localhost:4202/remoteEntry.mjs'],
      ['product-app', 'http://localhost:4203/remoteEntry.mjs'],
      ['orders-app', 'http://localhost:4204/remoteEntry.mjs'], // Replaces cart
      ['shared', 'http://localhost:4205/remoteEntry.mjs']
    ]
  };
  ```

---

### 5. Replace Existing CartButton

- Locate the current `CartButton` usage in `storefront`
- Replace it by dynamically loading the `OrderButton` component exposed by `orders-app`
- Keep the following logic:
  - Load ordered items from `localStorage` (from `CartButton`)
  - Use `CustomEvent` to get notified when a new item is added

---
