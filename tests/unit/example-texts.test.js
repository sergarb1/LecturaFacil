import { describe, it, expect } from 'vitest'
import { exampleTexts } from '../../src/data/example-texts.js'

const LANGUAGES = ['es', 'ca', 'va', 'eu', 'gl', 'en', 'fr', 'pt', 'de']
const LANG_NAMES = ['es', 'ca', 'va', 'eu', 'gl', 'en', 'fr', 'pt', 'de']

describe('example-texts', () => {
  it('exporta un objeto exampleTexts', () => {
    expect(exampleTexts).toBeDefined()
    expect(typeof exampleTexts).toBe('object')
  })

  it('contiene los 9 idiomas', () => {
    const keys = Object.keys(exampleTexts)
    expect(keys.sort()).toEqual(LANGUAGES.sort())
  })

  it.each(LANG_NAMES)('el idioma %s tiene title y text no vacíos', (lang) => {
    const entry = exampleTexts[lang]
    expect(entry).toBeDefined()
    expect(entry.title).toBeDefined()
    expect(entry.title.length).toBeGreaterThan(0)
    expect(entry.text).toBeDefined()
    expect(entry.text.length).toBeGreaterThan(0)
  })

  it('cada title tiene contenido (traducido)', () => {
    const titles = Object.values(exampleTexts).map(e => e.title)
    titles.forEach(t => {
      expect(t.length).toBeGreaterThan(0)
    })
  })

  it('cada texto tiene al menos 100 caracteres', () => {
    Object.entries(exampleTexts).forEach(([lang, entry]) => {
      expect(entry.text.length, `Idioma ${lang}`).toBeGreaterThanOrEqual(100)
    })
  })
})
