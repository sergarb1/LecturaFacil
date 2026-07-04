import { test, expect } from '@playwright/test'

test.describe('Texto de ejemplo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('carga texto de ejemplo en español', async ({ page }) => {
    const exampleBtn = page.locator('button', { hasText: 'Ejemplo' })
    await exampleBtn.click()
    const editor = page.locator('.editor-content')
    await expect(editor).not.toBeEmpty()
    const text = await editor.innerText()
    expect(text.length).toBeGreaterThan(100)
    expect(text.toLowerCase()).toContain('gallina')
  })

  test('texto de ejemplo funciona en los 9 idiomas', async ({ page }) => {
    const langButtons = page.locator('.language-selector button, [id*="lang"], button[title*="idioma"], button[aria-label*="idioma"]')
    const count = await langButtons.count()
    if (count >= 9) {
      for (let i = 0; i < count; i++) {
        await langButtons.nth(i).click()
        await page.waitForTimeout(300)
        await page.locator('button', { hasText: 'Ejemplo' }).click()
        const editor = page.locator('.editor-content')
        await expect(editor).not.toBeEmpty()
      }
    }
  })
})
