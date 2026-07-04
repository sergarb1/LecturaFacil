import { ref } from 'vue'

const definition = ref(null)
const loading = ref(false)
const errorMsg = ref('')

import DICT_ES from '../data/dictionary-es.js'
import DICT_EN from '../data/dictionary-en.js'
import DICT_CA from '../data/dictionary-ca.js'
import DICT_GL from '../data/dictionary-gl.js'
import DICT_EU from '../data/dictionary-eu.js'
import DICT_VA from '../data/dictionary-va.js'
import DICT_FR from '../data/dictionary-fr.js'
import DICT_PT from '../data/dictionary-pt.js'
import DICT_DE from '../data/dictionary-de.js'

const offlineDictionaries = {
  es: DICT_ES,
  en: DICT_EN,
  ca: DICT_CA,
  gl: DICT_GL,
  eu: DICT_EU,
  va: DICT_VA,
  fr: DICT_FR,
  pt: DICT_PT,
  de: DICT_DE
}

const API_LANGS = {
  es: 'es', en: 'en', fr: 'fr', pt: 'pt', de: 'de'
}

export function useDictionary() {
  async function lookup(word, lang = 'es') {
    const wordLower = word.toLowerCase().trim()
    if (!wordLower) return null

    definition.value = null
    errorMsg.value = ''
    loading.value = true

    try {
      if (API_LANGS[lang]) {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/${API_LANGS[lang]}/${encodeURIComponent(wordLower)}`
        )
        if (res.ok) {
          const data = await res.json()
          if (data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition) {
            definition.value = {
              word: wordLower,
              definition: data[0].meanings[0].definitions[0].definition,
              phonetic: data[0].phonetic || '',
              source: 'online'
            }
            loading.value = false
            return definition.value
          }
        }
      }
    } catch {
      // Error de red — usar offline
    }

    const dict = offlineDictionaries[lang] || offlineDictionaries.es
    const found = dict[wordLower]
    if (found) {
      definition.value = {
        word: wordLower,
        definition: found,
        phonetic: '',
        source: 'offline'
      }
    } else {
      const fallbackDict = offlineDictionaries.es
      const fallback = fallbackDict[wordLower]
      if (fallback) {
        definition.value = {
          word: wordLower,
          definition: fallback,
          phonetic: '',
          source: 'offline'
        }
      } else {
        errorMsg.value = 'No se encontró definición'
      }
    }

    loading.value = false
    return definition.value
  }

  return { definition, loading, errorMsg, lookup }
}
