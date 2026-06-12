# Deployment

This directory contains the runtime scaffolding for Docker Compose and Kubernetes.

## Layout

```text
deploy/
  docker/
    compose.yaml       # Local Docker Compose topology
    .env.example       # Local defaults copied to .env when needed
  k8s/
    base/              # Kustomize base manifests for the backend services
```

## Docker

Build the backend images from Nx:

```bash
npm run docker:build
```

Run the local stack:

```bash
cp deploy/docker/.env.example deploy/docker/.env
npm run docker:up
```

The root `docker-compose.yaml` includes `deploy/docker/compose.yaml`, so `docker compose up` from the repository root still works with Docker Compose v2.20 or newer.

Default local endpoints:

| Service | URL |
| --- | --- |
| API gateway | http://localhost:8080/api |
| Auth API | http://localhost:8081/api |
| Product API | http://localhost:8082/api |
| File storage API | http://localhost:8083/api |

## Kubernetes

Build and push images for your target registry, then update image names in `deploy/k8s/base/kustomization.yaml` or use a Kustomize overlay.

Apply the base manifests:

```bash
npm run k8s:apply
```

Remove them:

```bash
npm run k8s:delete
```

The base creates the `micro-nest` namespace, backend deployments, services, config, secrets, and persistent volume claims for MongoDB and file storage.
