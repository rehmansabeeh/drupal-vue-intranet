import { test, expect } from '@playwright/test';

test.describe('Colleague Directory Widget', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/vue'); 
  });

  test('should display search and filter users', async ({ page }) => {
    // 1. Find the input using the EXACT placeholder from your code
    const searchInput = page.getByPlaceholder('Search by name or username');
    await expect(searchInput).toBeVisible();

    // 2. Alternatively, find it by the Label text you defined
    const searchLabel = page.getByText('Search colleagues');
    await expect(searchLabel).toBeVisible();

    // 3. Perform the search
    await searchInput.fill('admin');

    // 4. Verify the "Clear" button appears (logic from your v-if="hasQuery")
    const clearButton = page.getByRole('button', { name: 'Clear' });
    await expect(clearButton).toBeVisible();

    // 5. Click clear and verify the input is empty
    await clearButton.click();
    await expect(searchInput).toHaveValue('');
  });
});