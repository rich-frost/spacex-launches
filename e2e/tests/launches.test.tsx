import { expect, test } from '@playwright/test';
import { checkA11y, injectAxe } from 'axe-playwright';

test.describe('SpaceX Launches page', () => {
  const pageUrl = 'http://localhost:3010/';

  test(`should render the list page`, async ({ page }) => {
    await page.goto(pageUrl);

    // Find FalconSat list item
    await page.getByRole('listitem').filter({ hasText: 'Mission: FalconSat' });

    await page.getByRole('heading', { name: 'Mission: FalconSat' });
    await page.getByText('Details: Engine failure at 33');
    await page.getByText('Launch Date: 24-03-2006 22:30:');
  });

  test(`should be able to search for launches`, async ({ page }) => {
    await page.goto(pageUrl);

    await page.getByRole('textbox', { name: 'Search mission name or' }).fill('Trail');

    await expect(page).toHaveURL('http://localhost:3010/?search=Trail');
  });

  test(`should be able to change sort order for launches`, async ({ page }) => {
    await page.goto(pageUrl);

    await page.goto('http://localhost:3010/');
    await page.getByLabel('Sort the list by field and').selectOption('mission_name:desc');

    await expect(page).toHaveURL('http://localhost:3010/?sort=mission_name%3Adesc');
  });

  test('should pass accessibility checks', async ({ page }) => {
    await page.goto(pageUrl);

    await injectAxe(page);
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
  });
});
