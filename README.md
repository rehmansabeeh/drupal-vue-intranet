🚀 Drupal + Vue 3 Progressively Decoupled Intranet Project

This project demonstrates a modern enterprise architecture for an intranet platform (PIIPE-style). It uses Drupal 10/11 as the backend engine and Vue 3 (TypeScript + Pinia) for interactive "islands" embedded directly into Drupal blocks.

🏗️ Architecture Detail

Backend: Drupal 10/11 running via DDEV (Docker).

Frontend Integration: Progressively Decoupled. Vue components are not a separate website; they are Drupal Blocks.

Communication Layer: - Axios: Fetches data from Drupal's standard JSON:API.

Pinia: Handles state between separate blocks (e.g., Search Block in Header filtering Directory Block in Content).

TypeScript: Enforces data integrity for complex Drupal JSON responses.

📂 Project Structure

backend/
├── web/
│   └── modules/
│       └── custom/
│           └── vue_intranet_widget/
│               ├── src/Plugin/Block/      <-- Drupal PHP Block Classes
│               ├── vue-app/               <-- Vue 3 Source Code
│               │   ├── src/
│               │   │   ├── components/    <-- Reusable UI (Search, Card)
│               │   │   ├── services/      <-- Axios API Logic
│               │   │   ├── stores/        <-- Pinia Global State
│               │   │   └── main.ts        <-- Multi-mount Entry Point
│               │   └── vite.config.ts     <-- HMR & Build Config
│               ├── assets/                <-- Compiled JS/CSS
│               └── vue_intranet_widget.libraries.yml


🏃 Daily Development Workflow

1. Boot the Environment

# Terminal 1: Start Drupal
cd backend
ddev start

# Terminal 2: Start Vue Hot-Reload (HMR)
cd backend/web/modules/custom/vue_intranet_widget/vue-app
npm run dev


2. URL Access (Crucial for HMR)

During development, always access the site via HTTP to avoid mixed-content blocks from the Vite server:
👉 http://backend.ddev.site

🛠️ Essential Commands

Action

Command

Clear Drupal Cache

ddev drush cr

Enable Module

ddev drush en vue_intranet_widget -y

Export Config

ddev drush cex -y

Delete "Ghost" Block

ddev drush config:delete block.block.[ID]

Rebuild Vue

npm run build (inside vue-app)

🔧 Technical Setup Notes

The "Multi-Mount" Strategy

To allow separate blocks, main.ts uses a conditional mounting strategy:

if (document.getElementById('vue-search-mount')) {
  createApp(UserSearch).use(pinia).mount('#vue-search-mount');
}
if (document.getElementById('vue-directory-mount')) {
  createApp(UserDirectory).use(pinia).mount('#vue-directory-mount');
}


The JSON:API Interface

TypeScript interfaces are used to map Drupal's nested data structure:

interface DrupalUser {
  id: string;
  attributes: {
    name: string;
    display_name: string | null;
  };
}


🆘 Troubleshooting

1. "The website encountered an error" (WSOD)

This happens if you rename a PHP Block class that is already placed in Drupal.

Run ddev drush config:status | grep block.block to find the stale ID.

Run ddev drush config:delete block.block.[ID].

Run ddev drush cr.

2. Hot Reload is not working

Verify npm run dev is running on port 5173.

Check vue_intranet_widget.libraries.yml points to http://localhost:5173/src/main.ts.

Ensure you are using http:// and not https:// in the browser.

3. Changes in Vue don't show up

If not using HMR, you must run npm run build and then clear Drupal's cache (ddev drush cr) because Drupal caches the library definitions.