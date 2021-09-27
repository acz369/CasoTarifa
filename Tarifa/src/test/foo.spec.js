const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/src/main/index.html');
  const title = page.locator('.navbar-header .navbar-title');
  await expect(title).toHaveText('Caso tarifa');
});