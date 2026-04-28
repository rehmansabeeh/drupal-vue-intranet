import { defineConfig, devices } from '@playwright/test'; 
export default defineConfig({
  // 1. CHANGE THIS to your new e2e folder
  testDir: './e2e', 
  
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    // 2. UNCOMMENT AND SET your dev server URL
    baseURL: 'http://backend.ddev.site', 
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Tip: You can comment out Firefox/Webkit for now to make local tests faster
  ],

  // 3. UNCOMMENT AND UPDATE this to boot Vite automatically
  webServer: {
    command: 'npm run dev',
    url: 'http://backend.ddev.site',
    reuseExistingServer: !process.env.CI,
  },
});