# Getting Started with MicroNest

This document provides basic instructions for setting up the environment and running the sample micro-frontends and NestJS services contained in this repository.

## Install Dependencies

1. Ensure that Node.js **22** or later is installed.
2. Install project packages:

   ```bash
   npm install
   ```

## Running the Apps

Use the Nx CLI to run individual micro-frontends or backend services. Replace `<project>` with the application name.

```bash
npx nx serve <project>
```

## Building

To create a production build, run:

```bash
npx nx build <project>
```

Build artifacts are stored in the `dist/` directory.

## Adding a Microservice or Micro-Frontend

- Generate a new NestJS microservice:

  ```bash
  nx g @nx/nest:app <service-name>
  ```

- Generate a new Angular remote (micro-frontend):

  ```bash
  nx g @nx/angular:remote <app-name> --host=<host-app> --port=<port>
  ```


