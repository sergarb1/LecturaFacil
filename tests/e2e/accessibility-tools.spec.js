import { test, expect } from '@playwright/test'

test.describe('Herramientas de accesibilidad', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('button', { hasText: 'Ejemplo' }).click()
    await page.waitForTimeout(500)
  })

  test('activar color por letra', async ({ page }) => {
    // Abrir panel de color por letra
    await page.locator('button:has-text("🎨")').click()
    await page.waitForTimeout(300)
    // Marcar el checkbox
    const checkbox = page.locator('input[type="checkbox"]')
    await checkbox.check()
    await page.waitForTimeout(500)
    const editor = page.locator('.editor-content')
    const spans = await editor.locator('span[style*="color"]').count()
    expect(spans).toBeGreaterThan(0)
  })

  test('activar modo pictogramas', async ({ page }) => {
    await page.locator('button:has-text("🖼️")').click()
    await page.waitForTimeout(500)
    const editor = page.locator('.editor-content')
    const pictograms = await editor.locator('[data-pictogram]').count()
    expect(pictograms).toBeGreaterThan(0)
    // Desactivar
    await page.locator('button:has-text("🖼️")').click()
    await page.waitForTimeout(300)
    const after = await editor.locator('[data-pictogram]').count()
    expect(after).toBe(0)
  })

  test('activar línea de enfoque', async ({ page }) => {
    await page.locator('button:has-text("👁️")').click()
    await page.waitForTimeout(300)
    const editor = page.locator('.editor-content')
    await editor.click()
    await page.waitForTimeout(300)
  })

  test('cambiar tema a oscuro', async ({ page }) => {
    // Abrir panel de temas
    const themeBtn = page.locator('button:has-text("☀️")')
    await themeBtn.click()
    await page.waitForTimeout(300)
    // Click en oscuro
    await page.locator('button:has-text("🌙")').click()
    await page.waitForTimeout(300)
    // El botón debería mostrar el icono de luna ahora
    await expect(page.locator('button:has-text("🌙")')).toBeVisible()
  })

  test('activar lectura guiada', async ({ page }) => {
    await page.locator('button:has-text("🔤")').click()
    await page.waitForTimeout(300)
    const progress = page.locator('.guided-progress')
    await expect(progress).toBeVisible()
  })

  test('activar regla de lectura', async ({ page }) => {
    await page.locator('button:has-text("📏")').click()
    await page.waitForTimeout(300)
    const editor = page.locator('.editor-content')
    await editor.click()
    await page.waitForTimeout(300)
  })
})
