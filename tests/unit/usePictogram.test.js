import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: ref('es')
  })
}))

const { usePictogram } = await import('../../src/composables/usePictogram.js')
const { default: PICTOGRAM_DICT } = await import('../../src/data/pictogram-dictionary.js')

describe('usePictogram', () => {
  let pictogram

  beforeEach(() => {
    pictogram = usePictogram()
    // Limpiar DOM por si acaso
    document.body.innerHTML = ''
  })

  it('pictogramMode empieza en false', () => {
    expect(pictogram.pictogramMode.value).toBe(false)
  })

  it('availableDictionaries contiene 9 idiomas', () => {
    expect(pictogram.availableDictionaries.value.sort()).toEqual(
      ['es', 'gl', 'ca', 'eu', 'va', 'en', 'fr', 'pt', 'de'].sort()
    )
  })

  it('findPictogram devuelve entry para palabra conocida en español', () => {
    const entry = pictogram.findPictogram('casa')
    expect(entry).not.toBeNull()
    expect(entry.image).toBeDefined()
  })

  it('findPictogram devuelve null para palabra inexistente', () => {
    const entry = pictogram.findPictogram('xyzxyzinexistente')
    expect(entry).toBeNull()
  })

  it('findPictogram funciona con mayúsculas', () => {
    const entry = pictogram.findPictogram('Casa')
    expect(entry).not.toBeNull()
    expect(entry.image).toBeDefined()
  })

  it('togglePictogram cambia el modo', () => {
    expect(pictogram.pictogramMode.value).toBe(false)
    pictogram.togglePictogram()
    expect(pictogram.pictogramMode.value).toBe(true)
    pictogram.togglePictogram()
    expect(pictogram.pictogramMode.value).toBe(false)
  })

  it('refreshPictograms no lanza error sin editor en DOM', () => {
    expect(() => pictogram.refreshPictograms()).not.toThrow()
  })

  it('markWords envuelve palabras en data-pictogram', () => {
    const editor = document.createElement('div')
    editor.className = 'editor-content'
    editor.textContent = 'la casa es bonita'
    document.body.appendChild(editor)

    pictogram.togglePictogram()

    const pictoSpans = editor.querySelectorAll('[data-pictogram]')
    expect(pictoSpans.length).toBeGreaterThanOrEqual(1)
    // Debe encontrar al menos "casa"
    expect(pictoSpans[0].dataset.word).toBe('casa')
    document.body.removeChild(editor)
  })

  it('unmarkWords restaura texto original', () => {
    const editor = document.createElement('div')
    editor.className = 'editor-content'
    editor.textContent = 'casa casa'
    document.body.appendChild(editor)

    pictogram.togglePictogram()
    const originalText = editor.textContent

    pictogram.togglePictogram()
    expect(editor.textContent).toBe(originalText)
    document.body.removeChild(editor)
  })
})
