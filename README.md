# Drupal + Vue 3 Progressively Decoupled Intranet Project

This project demonstrates a modern enterprise architecture for an intranet platform (PIIPE-style). It uses Drupal 10/11 as the backend engine and Vue 3 (TypeScript + Pinia) for interactive "islands" embedded directly into Drupal blocks.

It is designed with maintainability, automated quality assurance, and a robust CI/CD deployment lifecycle.

## Architecture Detail

**Backend:** Drupal 10/11 running locally via DDEV (Docker).

**Frontend Integration:** Progressively Decoupled. Vue components are not a separate SPA; they are rendered natively inside standard Drupal Blocks.

**Communication Layer:**
- **Axios:** Fetches data from Drupal's standard JSON:API.
- **Pinia:** Handles state between physically separate blocks (e.g., Search Block in Header filtering Directory Block in Content).
- **TypeScript:** Enforces data integrity for complex Drupal JSON responses.

**Quality Assurance:**
- **Playwright:** Automated End-to-End (E2E) testing for the integrated application.
- **GitHub Actions:** Decoupled CI/CD pipelines with deterministic builds and deployment gates.

**Configuration Management:** Database settings (Blocks, Permissions) are exported to version-controlled YAML files.

## Project Structure

```
/
├── .github/workflows/
│   ├── frontend.yml               # CI/CD Pipeline: Vue Lint, Build & Deploy
│   └── backend.yml                # CI/CD Pipeline: PHP Lint & Config Sync
├── backend/
│   ├── config/sync/               # Version-controlled Drupal YAML Config
│   └── web/modules/custom/vue_intranet_widget/
│       ├── src/Plugin/Block/      # Drupal PHP Block Classes
│       ├── vue-app/               # Vue 3 Source Code & E2E Tests
│       │   ├── src/
│       │   │   ├── components/    # Reusable UI (Search, Card)
│       │   │   ├── services/      # Axios API Logic
│       │   │   ├── stores/        # Pinia Global State
│       │   │   └── main.ts        # Multi-mount Entry Point
│       │   └── vite.config.ts     # HMR, CORS, & Build Config
│       ├── assets/                # Compiled JS/CSS (Production)
│       ├── vue_intranet_widget.module  # Dynamic Vite HMR Bridge
│       └── vue_intranet_widget.libraries.yml
```

## Daily Development Workflow

### 1. Boot the Environment

You need two terminal windows running simultaneously:

```bash
# Terminal 1: Start the Drupal Backend
cd backend
ddev start

# Terminal 2: Start Vue Hot-Reload (HMR) Server
cd backend/web/modules/custom/vue_intranet_widget/vue-app
npm run dev
```

### 2. URL Access

During development, always access the site via HTTP to avoid mixed-content blocks from the Vite server:

```
http://backend.ddev.site
```

## CI/CD & Deployment Strategy

This repository utilizes a Monorepo Strategy with decoupled GitHub Actions. Using path-filtering, the pipelines run independently to save resources.

**Frontend Pipeline:** Triggers only when `vue-app/` changes. Runs `npm ci`, type-checks via `vue-tsc`, and uploads deterministic production artifacts.

**Backend Pipeline:** Triggers on Drupal changes. Runs a strict PHP Syntax linter (`php -l`).

**Continuous Delivery:** Code pushed/merged to the `dev` branch auto-deploys to the Staging Environment. Code merged to `main` prepares a build but requires manual human approval via GitHub Environments before deploying to Production.

## Essential Commands

| Action | Command | Context |
|--------|---------|---------|
| Clear Drupal Cache | `ddev drush cr` | Run after changing PHP or .yml files. |
| Export Config | `ddev drush cex -y` | Run after changing block settings in the Drupal UI. |
| Import Config | `ddev drush cim -y` | Run after pulling new code to sync the DB. |
| Build Frontend | `npm run build` | Compiles Vue into the /assets folder. |
| Lint Frontend | `npm run build-only` | Runs strict TypeScript checks. |
| Delete Ghost Block | `ddev drush config:delete block.block.[ID]` | Fixes WSOD if you rename a placed block. |

## Technical Setup Notes

### 1. The "Smart Ping" Dynamic Vite Bridge

You do not need to manually edit `libraries.yml` to switch between Dev and Production. The `vue_intranet_widget.module` file contains a hook (`hook_library_info_alter`) that attempts a socket connection to `host.docker.internal:5173`.

**If Vite answers:** It injects `localhost:5173` paths for Hot Module Replacement.

**If Vite is offline:** It falls back to the minified `assets/index.js`.

### 2. The "Multi-Mount" Strategy

To allow separate blocks to render independently on the page, `main.ts` uses a conditional mounting strategy:

```javascript
// main.ts
if (document.getElementById('vue-search-mount')) {
  createApp(UserSearch).use(pinia).mount('#vue-search-mount');
}
if (document.getElementById('vue-directory-mount')) {
  createApp(UserDirectory).use(pinia).mount('#vue-directory-mount');
}
```

### 3. The JSON:API Interface

TypeScript interfaces map Drupal's nested data structure to ensure type safety across the application:

```typescript
export interface DrupalUser {
  id: string;
  attributes: {
    name: string;
    display_name: string | null;
  };
}
```

## Troubleshooting

### 1. "The website encountered an unexpected error" (WSOD)

This usually happens if you rename a PHP Block class that is already placed in Drupal's UI. The database is looking for a file that no longer exists.

**Find the stale ID:**
```bash
ddev drush config:status | grep block.block
```

**Delete it:**
```bash
ddev drush config:delete block.block.[ID]
```

**Clear cache:**
```bash
ddev drush cr
```

### 2. CI/CD Fails with "lock file's picomatch does not satisfy..."

This means your `package.json` and `package-lock.json` are out of sync. The pipeline enforces `npm ci` (Clean Install), which fails on mismatched lockfiles to prevent production bugs.

**Fix:** Run `npm install` locally in the `vue-app` directory, commit the updated `package-lock.json`, and push again.

### 3. Hot Reload is not working

- Verify `npm run dev` is running on port 5173.
- Check that `vite.config.ts` has `host: '0.0.0.0'` and `allowedHosts: ['host.docker.internal', 'localhost']`.
- Run `ddev drush cr` so the PHP hook can re-check the Vite socket connection.