import { describe, it, expect, beforeEach } from 'vitest'
import { useTheme } from '../../src/composables/useTheme.js'

describe('useTheme', () => {
  let theme

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.style.cssText = ''
    theme = useTheme()
  })

  it('exporta themes con 4 temas', () => {
    expect(theme.themes).toBeDefined()
    const names = Object.keys(theme.themes)
    expect(names).toContain('claro')
    expect(names).toContain('oscuro')
    expect(names).toContain('sepia')
    expect(names).toContain('altoContraste')
    expect(names.length).toBe(4)
  })

  it('cada tema tiene label, icon, y vars', () => {
    Object.entries(theme.themes).forEach(([name, t]) => {
      expect(t.label, `Tema ${name}`).toBeDefined()
      expect(t.icon, `Tema ${name}`).toBeDefined()
      expect(t.vars, `Tema ${name}`).toBeDefined()
      expect(typeof t.vars, `Tema ${name}`).toBe('object')
    })
  })

  it('cada tema tiene todas las variables CSS necesarias', () => {
    const requiredVars = [
      '--bg-page', '--bg-editor', '--bg-card',
      '--text-primary', '--text-secondary', '--text-muted',
      '--border', '--border-accent', '--accent', '--accent-light',
      '--overlay'
    ]
    Object.entries(theme.themes).forEach(([name, t]) => {
      requiredVars.forEach(v => {
        expect(t.vars[v], `Tema ${name} falta ${v}`).toBeDefined()
      })
    })
  })

  it('applyTheme cambia activeTheme', () => {
    expect(theme.activeTheme.value.label).toBe('Claro')
    theme.applyTheme('oscuro')
    expect(theme.activeTheme.value.label).toBe('Oscuro')
  })

  it('applyTheme establece variables CSS en :root', () => {
    theme.applyTheme('oscuro')
    expect(document.documentElement.style.getPropertyValue('--bg-page')).toBe('#0f172a')
    expect(document.documentElement.style.getPropertyValue('--text-primary')).toBe('#e2e8f0')
  })

  it('applyTheme persiste en localStorage', () => {
    theme.applyTheme('sepia')
    expect(localStorage.getItem('lf-tema')).toBe('sepia')
  })

  it('applyTheme no hace nada con nombre inválido', () => {
    theme.applyTheme('sepia')
    theme.applyTheme('invalido')
    expect(theme.activeTheme.value.label).toBe('Sepia')
  })

  it('initTheme restaura tema guardado', () => {
    localStorage.setItem('lf-tema', 'altoContraste')
    theme.initTheme()
    expect(theme.activeTheme.value.label).toBe('Alto contraste')
  })

  it('initTheme usa claro si no hay tema guardado', () => {
    theme.initTheme()
    expect(theme.activeTheme.value.label).toBe('Claro')
  })
})
