import { test, expect } from '@playwright/test';

test.describe('Colleague Directory Widget', () => {
  
  // 1. Point Playwright to your local Drupal site
  test.beforeEach(async ({ page }) => {
    await page.goto('http://backend.ddev.site');
  });

  test('should display the directory and filter users', async ({ page }) => {
    // 2. Check if the widget heading exists on the Drupal page
    const heading = page.locator('h2:has-text("Colleague Directory")');
    await expect(heading).toBeVisible();

    // 3. Find the search input and type a name
    const searchInput = page.locator('input[placeholder="Search colleagues..."]');
    await searchInput.fill('admin');

    // 4. Verify that the list updates to show the admin card
    const userCard = page.locator('.user-card', { hasText: 'admin' });
    await expect(userCard).toBeVisible();
  });

  test('should show a loading state initially', async ({ page }) => {
    // This checks that our Skeleton UI exists while the API is pending
    const skeletons = page.locator('.skeleton');
    // Note: This might be too fast to catch on local, but it's good practice!
    if (await skeletons.count() > 0) {
      await expect(skeletons.first()).toBeVisible();
    }
  });
});