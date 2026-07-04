import { test, expect } from '@playwright/test'

test.describe('Diseño responsive', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('button', { hasText: 'Ejemplo' }).click()
    await page.waitForTimeout(500)
  })

  test('se ve correctamente en 1280px', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.waitForTimeout(500)
    const header = page.locator('header, nav, [class*="header"]').first()
    await expect(header).toBeVisible()
    const editor = page.locator('.editor-content')
    await expect(editor).toBeVisible()
    const select = page.locator('select').first()
    await expect(select).toBeVisible()
  })

  test('se ve correctamente en 768px', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.waitForTimeout(500)
    const editor = page.locator('.editor-content')
    await expect(editor).toBeVisible()
    const select = page.locator('select').first()
    await expect(select).toBeVisible()
  })

  test('se ve correctamente en 375px (móvil)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.waitForTimeout(500)
    const editor = page.locator('.editor-content')
    await expect(editor).toBeVisible()
  })

  test('el toolbar de formato se ve en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.waitForTimeout(500)
    const fontSelect = page.locator('select').first()
    await expect(fontSelect).toBeVisible()
    const boldBtn = page.locator('button[title="Negrita"]')
    await expect(boldBtn).toBeVisible()
  })
})
