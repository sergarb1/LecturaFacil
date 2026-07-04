import { describe, it, expect } from 'vitest'
import { useColorPerLetter } from '../../src/composables/useColorPerLetter.js'

describe('useColorPerLetter', () => {
  const cpl = useColorPerLetter()

  it('getPresets devuelve 6 presets', () => {
    const presets = cpl.getPresets()
    const names = Object.keys(presets)
    expect(names).toContain('arcoiris')
    expect(names).toContain('vocales')
    expect(names).toContain('altoContraste')
    expect(names).toContain('azulSuave')
    expect(names).toContain('verdeVioleta')
    expect(names).toContain('rojoAzul')
    expect(names.length).toBe(6)
  })

  it('cada preset tiene label, desc y colors', () => {
    const presets = cpl.getPresets()
    Object.entries(presets).forEach(([name, p]) => {
      expect(p.label, `Preset ${name}`).toBeDefined()
      expect(p.desc, `Preset ${name}`).toBeDefined()
      expect(p.colors, `Preset ${name}`).toBeDefined()
    })
  })

  it('cada preset tiene 26 letras (a-z)', () => {
    const presets = cpl.getPresets()
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    Object.entries(presets).forEach(([name, p]) => {
      letters.forEach(l => {
        expect(p.colors[l], `Preset ${name} falta letra ${l}`).toBeDefined()
      })
    })
  })

  it('cada color es un hex válido', () => {
    const presets = cpl.getPresets()
    Object.entries(presets).forEach(([name, p]) => {
      Object.entries(p.colors).forEach(([letter, color]) => {
        expect(color, `${name}[${letter}]`).toMatch(/^#[0-9a-f]{6}$/)
      })
    })
  })

  it('getPreset devuelve el preset correcto', () => {
    const preset = cpl.getPreset('vocales')
    expect(preset.label).toBe('Vocales destacadas')
    expect(preset.colors.a).toBe('#d32f2f')
    expect(preset.colors.b).toBe('#1565c0')
  })

  it('getPreset con nombre inválido devuelve arcoiris', () => {
    const preset = cpl.getPreset('invalido')
    expect(preset.label).toBe('Arcoíris')
  })

  it('applyColorPerLetter no falla con editor null', () => {
    expect(() => cpl.applyColorPerLetter(null)).not.toThrow()
  })

  it('removeColorPerLetter no falla con editor null', () => {
    expect(() => cpl.removeColorPerLetter(null)).not.toThrow()
  })

  it('applyColorPerLetter colorea letras en editor', () => {
    const editor = document.createElement('div')
    editor.textContent = 'Hola'
    document.body.appendChild(editor)
    cpl.applyColorPerLetter(editor, cpl.getPreset('vocales').colors)
    const spans = editor.querySelectorAll('span[style*="color"]')
    expect(spans.length).toBeGreaterThan(0)
    expect(spans[1].style.color).toBe('#d32f2f') // o -> vocal -> rojo
    document.body.removeChild(editor)
  })

  it('removeColorPerLetter restaura texto plano', () => {
    const editor = document.createElement('div')
    editor.textContent = 'Hola'
    document.body.appendChild(editor)
    cpl.applyColorPerLetter(editor, cpl.getPreset('rojoAzul').colors)
    cpl.removeColorPerLetter(editor)
    expect(editor.textContent).toBe('Hola')
    document.body.removeChild(editor)
  })
})
