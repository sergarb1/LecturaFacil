import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PICTOGRAM_DICT from '../data/pictogram-dictionary.js'

const pictogramMode = ref(false)
const pictogramDictionary = ref(PICTOGRAM_DICT)
const availableDictionaries = ref(['es', 'gl', 'ca', 'eu', 'va', 'en', 'fr', 'pt', 'de'])

export function usePictogram() {
  const { locale } = useI18n()

  function togglePictogram() {
    pictogramMode.value = !pictogramMode.value
    if (pictogramMode.value) {
      markWords()
    } else {
      unmarkWords()
    }
  }

  function getDictForLang(lang) {
    const dict = pictogramDictionary.value[lang]
    if (dict) return dict
    // Fallback: devolver el español (contiene la mayoría de pictogramas)
    return pictogramDictionary.value.es || {}
  }

  function markWords() {
    const editor = document.querySelector('.editor-content')
    if (!editor) return

    const lang = locale.value || 'es'
    const dict = getDictForLang(lang)

    const words = Object.keys(dict)
    if (words.length === 0) return

    const treeWalker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT)
    const textNodes = []
    while (treeWalker.nextNode()) {
      let parent = treeWalker.currentNode.parentNode
      let skip = false
      while (parent && parent !== editor) {
        if (parent.dataset?.pictogram === 'true' || parent.classList?.contains('lf-highlight')) {
          skip = true
          break
        }
        parent = parent.parentNode
      }
      if (!skip) textNodes.push(treeWalker.currentNode)
    }

    textNodes.forEach(node => {
      const text = node.textContent
      // Sort by longest word first to avoid partial matches
      const sortedWords = [...words].sort((a, b) => b.length - a.length)
      const regex = new RegExp('\\b(' + sortedWords.join('|') + ')\\b', 'gi')
      const fragment = document.createDocumentFragment()
      let lastIndex = 0
      let match

      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)))
        }

        const word = match[0].toLowerCase()
        const entry = dict[word]
        const wrapper = document.createElement('span')
        wrapper.dataset.pictogram = 'true'
        wrapper.dataset.word = word
        wrapper.className = 'pictogram-inline'

        const textSpan = document.createElement('span')
        textSpan.className = 'pictogram-text'
        textSpan.textContent = match[0]

        const img = document.createElement('span')
        img.className = 'pictogram-img'
        if (entry && entry.image) {
          const emoji = (entry && entry.emoji) || '🖼️'
          img.innerHTML = `<img src="${entry.image}" alt="${word}" loading="lazy" class="w-8 h-8 object-contain" onerror="this.onerror=null;this.style.display='none';this.parentElement.textContent='${emoji}'">`
        } else if (entry && entry.emoji) {
          img.textContent = entry.emoji
        } else {
          img.textContent = ''
        }

        wrapper.appendChild(textSpan)
        wrapper.appendChild(img)
        fragment.appendChild(wrapper)

        lastIndex = match.index + match[0].length
      }

      if (lastIndex > 0) {
        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex)))
        }
        node.parentNode.replaceChild(fragment, node)
      }
    })
  }

  function unmarkWords() {
    document.querySelectorAll('[data-pictogram]').forEach(el => {
      const parent = el.parentNode
      const textEl = el.querySelector('.pictogram-text')
      parent.replaceChild(document.createTextNode(textEl ? textEl.textContent : el.textContent), el)
      parent.normalize()
    })
  }

  function findPictogram(word) {
    const lang = locale.value || 'es'
    const dict = getDictForLang(lang)
    return dict[word.toLowerCase()] || null
  }

  /**
   * Descarga un diccionario público desde una URL JSON y lo añade al diccionario local
   * @param {string} lang - Código de idioma (ej: 'fr', 'pt')
   * @param {string} url - URL del JSON con formato { palabra: { image, emoji } }
   */
  async function downloadPublicDictionary(lang, url) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (!pictogramDictionary.value[lang]) {
        pictogramDictionary.value[lang] = {}
        availableDictionaries.value.push(lang)
      }
      Object.assign(pictogramDictionary.value[lang], data)
      if (pictogramMode.value) {
        unmarkWords()
        markWords()
      }
      return true
    } catch (err) {
      console.warn('Error descargando diccionario:', err)
      return false
    }
  }

  function refreshPictograms() {
    if (pictogramMode.value) {
      unmarkWords()
      markWords()
    }
  }

  return {
    pictogramMode,
    togglePictogram,
    findPictogram,
    downloadPublicDictionary,
    availableDictionaries,
    refreshPictograms
  }
}
