// npx playwright test
import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('should load a list of all Pokémon on page load', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const pokemonRows = await page.locator('table tbody tr');
    expect(await pokemonRows.count()).toBeGreaterThan(0);

    const firstPokemonName = await page.locator('table tbody tr:nth-child(1) td:first-child').textContent();
    expect(firstPokemonName).toBeTruthy();
  });

  test('should load a list of all profiles on page load', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.locator('input[aria-label="Profile"]').click();
    const profileOptions = await page.locator('.MuiAutocomplete-popper li');
    expect(await profileOptions.count()).toBeGreaterThan(0);

    const firstProfileName = await profileOptions.nth(0).textContent();
    expect(firstProfileName).toBeTruthy();
  });

  test('should load Pokémon data for a selected profile', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.locator('input[aria-label="Profile"]').click();
    const profileName = await page.locator('.MuiAutocomplete-popper li').nth(0).textContent();
    await page.locator('.MuiAutocomplete-popper li').nth(0).click();

    const profileInputValue = await page.locator('input[aria-label="Profile"]').inputValue();
    expect(profileInputValue).toBe(profileName);

    const selectedPokemonCheckboxes = await page.locator('table tbody tr td:nth-child(3) input:checked');
    expect(await selectedPokemonCheckboxes.count()).toBeGreaterThan(0);

    const selectedPokemonNames = await page.locator('table tbody tr:has(input:checked) td:first-child').allTextContents();
    expect(selectedPokemonNames.length).toBeGreaterThan(0);
  });
});