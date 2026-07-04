import { test, expect } from '@playwright/test'

test.describe('Modo lectura y voz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('button', { hasText: 'Ejemplo' }).click()
    await page.waitForTimeout(500)
  })

  test('activar modo lectura', async ({ page }) => {
    const readerBtn = page.locator('button', { hasText: /lectura|reader/i }).first()
    if (await readerBtn.isVisible()) {
      await readerBtn.click()
      await page.waitForTimeout(300)
    }
  })

  test('abrir panel de voz', async ({ page }) => {
    const voiceBtn = page.locator('button', { hasText: /voz|voice|🔊/i }).first()
    if (await voiceBtn.isVisible()) {
      await voiceBtn.click()
      await page.waitForTimeout(500)
    }
  })

  test('cambiar velocidad de voz', async ({ page }) => {
    const voiceBtn = page.locator('button', { hasText: /voz|voice|🔊/i }).first()
    if (await voiceBtn.isVisible()) {
      await voiceBtn.click()
      await page.waitForTimeout(300)
      const speedInput = page.locator('input[type="range"], input[type="number"]').first()
      if (await speedInput.isVisible()) {
        await speedInput.fill('1.5')
        await page.waitForTimeout(200)
      }
    }
  })
})
