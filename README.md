# MicroNest: A sample of MSA and Micro-Frontends build with Nx, Angular and NestJS
<span>
  <a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="100"></a>
  <a alt="NextJS logo " href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
  <a alt="Angular logo" href="https://angular.dev/" target="_blank" rel="noreferrer"><img src="https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png" width="240"></a>
</span>


Welcome to **MicroNest**! This project showcases the implementation of a micro-frontends architecture using a monorepo setup with [NestJS](https://nestjs.com/), a progressive Node.js framework.

## Table of Contents

- [E-Commerce MFE Platform (Assignment)](#e-commerce-mfe-platform-assignment)
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Adding a New Micro-Frontend](#adding-a-new-micro-frontend)
- [Adding a New Microservice](#adding-a-new-micro-service)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## E-Commerce MFE Platform (Assignment)

The platform follows **Option 1 — Webpack Module Federation** with one team/app per business domain:

| Team / MFE | App | Framework | Port | Exposes (Module Federation) | Mounted in shell at |
|---|---|---|---|---|---|
| Shell | `apps/storefront` | Angular 19 | 4200 | — (host) | — |
| Products | `apps/product-app` | Angular 19 | 4203 | `./Routes`, `./BestSellingFragment` | `/pages/products`, dashboard fragment |
| Orders | `apps/orders-app` | Angular 19 | 4206 | `./Routes`, `./OrderButton` | `/orders`, header button |
| Account | `apps/auth-app` | Angular 19 | 4202 | `./Routes` (login), `./AccountRoutes` (profile) | `/auth`, `/account` |
| Checkout | `apps/cart` | **React 18** | 4204 | `./CartButton`, `./CartPage` (custom elements) | header button, `/cart` |
| Shared UI | `apps/shared` | Angular 19 | 4205 | `./SharedButtonComponent`, `./SharedCardComponent`, `./SharedBadgeComponent`, `./SharedHeaderComponent` | on demand |

The React remotes integrate through **web components** (`<mfe-cart-button>`, `<mfe-cart-page>`); the Angular remotes integrate through **route-level federation** (`loadRemoteModule(..., './Routes')`) and **component-level federation** (`ngComponentOutlet` for the order button, dashboard best-selling fragment with a fallback component).

### Features

- **Shell** — global layout (header/footer wrap every route), navigation menu with router links, authentication state in the header (sign in / greeting + sign out), route guard (`officerGuard`) protecting `/orders` and `/account`, runtime remote resolution via `module-federation.manifest.json`.
- **Products** — product list (`/pages/products`) with search filtering, product detail (`/pages/products/:id`), Add to Cart from both pages.
- **Orders** — order list (`/orders`) and order detail (`/orders/:id`) fed by orders placed at checkout.
- **Account** — login (`/auth/login`), user information + update-profile form (`/account`).
- **Checkout** — shopping cart page (`/cart`) with quantities, remove buttons, checkout summary (subtotal/shipping/total) and **Place order**, which creates an order the Orders MFE displays.

### Communication (Part 2 — three mechanisms)

1. **Custom Events** (`libs/shared/hub` → `MFE_EVENTS`): `cart:add`/`cart:changed` (product → cart & order buttons), `orders:changed` (checkout → orders), `auth:changed` (account → shell header), `mfe:navigate` (remotes ask the shell router to navigate — keeps remotes router-agnostic).
2. **Shared Store** (`libs/shared/hub` → `store.ts`): a localStorage-backed store with a single owner of writes — keys `CART_ITEMS`, `ORDERS`, `USER_PROFILE`, `userRole` — shared by Angular *and* React MFEs, plus the singleton `EventBus`.
3. **URL State**: the shell search box navigates to `/pages/products?q=...` (read by the Products MFE); product/order ids travel in route params (`/pages/products/:id`, `/orders/:id`).

### Shared UI (Part 3)

`libs/shared/ui` provides reusable standalone components used across the MFEs: **Button** (`mfe-ui-button`), **Card** (`mfe-ui-card`), **Header** (`mfe-ui-header`), **Badge** (`mfe-ui-badge`). The `apps/shared` remote also exposes them at runtime via Module Federation.

### Run it

```bash
npm install
npx nx serve storefront            # serves the shell + all remotes statically
# or, for live-reload on a remote you are editing:
npx nx serve storefront --devRemotes=product-app
```

Open http://localhost:4200 — flow: browse products → add to cart → open cart → place order → see it in orders; sign in via `/auth/login`, then edit your profile at `/account`.

### Screenshots & Demo

Full demo video: [docs/demo/demo.mp4](docs/demo/demo.mp4) (also [demo.webm](docs/demo/demo.webm)).

| | |
|---|---|
| ![Shell dashboard](docs/screenshots/01-shell-dashboard.png) Shell: global layout + nav | ![Best-selling fragment](docs/screenshots/02-dashboard-best-selling-fragment.png) Dashboard renders the Products remote fragment |
| ![Product list](docs/screenshots/03-products-list.png) Products MFE: product list | ![Search via URL state](docs/screenshots/04-products-search-url-state.png) Search → `/pages/products?q=…` (URL state) |
| ![Product detail](docs/screenshots/05-product-detail.png) Products MFE: product detail | ![Added to cart](docs/screenshots/06-product-added-to-cart.png) Add to Cart → custom event updates header badges |
| ![Cart & checkout summary](docs/screenshots/07-cart-checkout-summary.png) Checkout MFE (React) inside the Angular shell | ![Auth guard](docs/screenshots/08-auth-guard-login.png) Route guard redirects `/orders` to login |
| ![Order confirmation](docs/screenshots/10-order-confirmation.png) Place order → shared store creates the order | ![Orders list](docs/screenshots/11-orders-list.png) Orders MFE: order list |
| ![Order detail](docs/screenshots/12-order-detail.png) Orders MFE: order detail | ![Account profile](docs/screenshots/13-account-profile.png) Account MFE: user info + update profile |

## Overview

**MicroNest** is designed to demonstrate how multiple micro-frontends can be developed, tested, and deployed independently within a single monorepo. Each micro-frontend serves a specific feature of the application and communicates with a central NestJS backend service.

### Goals

- Microservices architecture.
- Independent development and deployment of frontends.
- Independent backend with NestJS Microservices.
- Efficient collaboration and code management using a monorepo.

## Project Structure

```plaintext
micro-nest/
|-- apps/
|   |-- app-1-ui/       # Micro-frontend 1 (e.g., User Dashboard)
|   |-- app-2-ui/       # Micro-frontend 2 (e.g., Admin Panel)
|   |-- shared/           # Shared UI micro-frontend
|   |-- app-1/            # NestJS micro service
|-- scripts/              # Utility scripts for project management
|-- .gitignore            # Git ignore file
|-- .eslintrc             # ESLint configuration file
|-- .eslintignore         # ESLint ignore file
|-- .prettierrc           # Prettier configuration file
|-- .prettierignore       # Prettier ignore file
|-- docker-compose.yaml   # Docker compose
|-- jest.config.ts        # Jest config
|-- jest.preset.ts        # Jest preset config
|-- package.json          # Root package configuration
|-- README.md             # This README file
|-- tsconfig.base.json    # TypeScript configuration
|-- nx.json               # Nx workspace configuration
```

## Getting Started
- NodeJS >= 22
- npm i


## Running the Project
### Start the application

Run `npx nx serve [appName]` to start the development server. Happy coding!

### Build for production

Run `npx nx build [appName]` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

### Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Running with Docker

### Build the Docker Image
```
nx run [appName]:docker-build
```
### Run the Docker Container
```
docker run [appName]:latest
```

### Docker Compose
```
docker compose up
```


## Adding a New Micro-Frontend
```
nx g @nx/angular:remote appName --host=[hostApp] --port=[portValue]
```

## Adding a New Microservice
```
nx g @nx/nest:app [appName]
```

## Technologies Used
- Nx
- NestJS
- Angular
- Jest
- Cypress
- Swagger
- Docker

## Contributing

We welcome contributions to **MicroNest**! Whether you're fixing a bug, improving documentation, or adding new features, your help is greatly appreciated. Please follow the guidelines below to contribute to this project:

### How to Contribute

1. **Fork the Repository**

  - Click on the "Fork" button at the top right corner of this repository page to create a copy of the repository in your GitHub account.

2. **Clone Your Fork**

  - Clone your forked repository to your local development environment using the command:

    ```bash
    git clone https://github.com/yourusername/micro-nest.git
    ```

  - Replace `yourusername` with your GitHub username.

3. **Create a New Branch**

  - Before making any changes, create a new branch to work on. Use a descriptive branch name that indicates what you're working on:

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. **Make Your Changes**

  - Implement your changes in the codebase. Please ensure your code follows the project's style guide and best practices.

5. **Test Your Changes**

  - Make sure your changes don't break existing functionality by running tests or building the project. Testing is crucial for maintaining code quality.

    ```bash
    nx run [appName]:test
    ```

6. **Commit Your Changes**

  - Add and commit your changes with a clear and concise commit message:

    ```bash
    git add .
    git commit -m "[prefixes] [Summary] \n [Add description of your changes]"
    ```

7. **Push to Your Fork**

  - Push your changes to your forked repository:

    ```bash
    git push origin feature/your-feature-name
    ```

8. **Create a Pull Request**

  - Go to the original repository on GitHub, and you'll see a notification suggesting you create a pull request from your forked repo. Click on the "Compare & pull request" button.
  - Provide a clear description of your changes, link any related issues (if applicable), and submit the pull request for review.

### Contribution Guidelines

- Ensure that your code adheres to the existing style guides.
- Write clear and descriptive commit messages.
- When adding new features, include documentation and relevant tests.
- Check if your changes pass the CI/CD pipelines.

### Reporting Issues

- If you encounter a bug or have a feature request, please use the [issue tracker](https://github.com/yourusername/micro-nest/issues) to report it.
- Provide as much detail as possible, including steps to reproduce the issue and any relevant screenshots.

### Code of Conduct

- We expect contributors to adhere to the [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand what kind of behavior is expected.

Thank you for your contributions! Together, we can make **MicroNest** better.


## License
MIT License
