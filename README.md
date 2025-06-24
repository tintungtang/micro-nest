# MicroNest: A sample of MSA and Micro-Frontends build with Nx, Angular and NestJS
<span>
  <a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="100"></a>
  <a alt="NextJS logo " href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
  <a alt="Angular logo" href="https://angular.dev/" target="_blank" rel="noreferrer"><img src="https://angular.dev/assets/images/press-kit/angular_wordmark_gradient.png" width="240"></a>
</span>


Welcome to **MicroNest**! This project showcases the implementation of a micro-frontends architecture using a monorepo setup with [NestJS](https://nestjs.com/), a progressive Node.js framework.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Adding a New Micro-Frontend](#adding-a-new-micro-frontend)
- [Adding a New Microservice](#adding-a-new-micro-service)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

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

## Cart Application Features

The Cart micro-frontend is a React-based application that provides comprehensive shopping cart functionality:

### Key Features
- **Add to Cart**: Users can add products to their shopping cart
- **Quantity Management**: Increase/decrease item quantities with intuitive controls
- **Remove Items**: Remove individual items from the cart
- **Cart Persistence**: Cart data is saved in localStorage across browser sessions
- **Real-time Updates**: Cart count updates automatically across the application
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Cart Components
- **Cart Button**: Reusable web component showing cart item count with badge
- **Cart Page**: Full cart management interface with item list and summary
- **Quantity Controls**: Interactive buttons for adjusting item quantities

### Cart Usage
```bash
# Start the cart application
npx nx serve cart

# Build cart for production
npx nx build cart

# Run cart tests
npx nx test cart
```

The cart application runs on port 4203 by default and integrates with other micro-frontends through custom events and web components.

## Quick Start Guide

### Development Setup
1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start All Applications**
   ```bash
   # Start backend services
   npx nx run-many -t serve -p auth product file-storage

   # Start frontend applications
   npx nx run-many -t serve -p storefront cart product-app auth-app
   ```

3. **Access Applications**
   - Main Storefront: http://localhost:4200
   - Cart App: http://localhost:4203
   - Product App: http://localhost:4202

### Testing
```bash
# Run all tests
npx nx run-many -t test

# Test specific app
npx nx test cart
npx nx test product
```

## License
MIT License
