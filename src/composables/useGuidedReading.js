import { ref } from 'vue'

const guidedMode = ref(false)
const currentIndex = ref(0)
const totalWords = ref(0)
let editorEl = null
let wordElements = []

function getPlainTextWords(text) {
  return text.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').split(/\s+/).filter(w => w.length > 0)
}

export function useGuidedReading() {
  function toggleGuided() {
    guidedMode.value = !guidedMode.value
    if (guidedMode.value) {
      initGuided()
    } else {
      cleanupGuided()
    }
  }

  function initGuided() {
    editorEl = document.querySelector('.editor-content')
    if (!editorEl) return

    // Make editor non-editable while in guided mode
    editorEl.contentEditable = 'false'
    editorEl.classList.add('guided-reading')

    wrapWords()
    currentIndex.value = 0
    highlightWord(0)
  }

  function cleanupGuided() {
    if (editorEl) {
      editorEl.contentEditable = 'true'
      editorEl.classList.remove('guided-reading')
    }
    // Restore original text
    editorEl?.querySelectorAll('.gr-word').forEach(el => {
      const parent = el.parentNode
      parent.replaceChild(document.createTextNode(el.textContent), el)
      parent.normalize()
    })
    wordElements = []
    currentIndex.value = 0
    totalWords.value = 0
    editorEl = null
  }

  function wrapWords() {
    if (!editorEl) return
    wordElements = []

    const walker = document.createTreeWalker(editorEl, NodeFilter.SHOW_TEXT)
    const textNodes = []
    while (walker.nextNode()) {
      let parent = walker.currentNode.parentNode
      let skip = false
      while (parent && parent !== editorEl) {
        if (parent.dataset?.pictogram === 'true' || parent.classList?.contains('pictogram-inline')) {
          skip = true
          break
        }
        parent = parent.parentNode
      }
      if (!skip) textNodes.push(walker.currentNode)
    }

    let wordCount = 0

    textNodes.forEach(node => {
      const text = node.textContent
      const words = text.split(/\s+/)
      const fragment = document.createDocumentFragment()

      for (let i = 0; i < words.length; i++) {
        if (words[i].length === 0) continue

        if (i > 0) {
          fragment.appendChild(document.createTextNode(' '))
        }

        const span = document.createElement('span')
        span.className = 'gr-word'
        span.dataset.wordIndex = wordCount
        span.textContent = words[i]
        fragment.appendChild(span)
        wordElements.push(span)
        wordCount++
      }

      if (wordCount > 0) {
        node.parentNode.replaceChild(fragment, node)
      }
    })

    totalWords.value = wordCount
  }

  function highlightWord(index) {
    // Remove active from all
    wordElements.forEach(el => el.classList.remove('gr-word-active'))

    if (index >= 0 && index < wordElements.length) {
      const el = wordElements[index]
      el.classList.add('gr-word-active')
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  function nextWord() {
    if (!guidedMode.value) return
    if (currentIndex.value < wordElements.length - 1) {
      currentIndex.value++
      highlightWord(currentIndex.value)
    }
  }

  function prevWord() {
    if (!guidedMode.value) return
    if (currentIndex.value > 0) {
      currentIndex.value--
      highlightWord(currentIndex.value)
    }
  }

  function goToWord(index) {
    if (!guidedMode.value) return
    if (index >= 0 && index < wordElements.length) {
      currentIndex.value = index
      highlightWord(index)
    }
  }

  function handleKeydown(e) {
    if (!guidedMode.value) return
    if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextWord()
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      prevWord()
    }
  }

  function handleWordClick(e) {
    if (!guidedMode.value) return
    const word = e.target.closest('.gr-word')
    if (word) {
      const idx = parseInt(word.dataset.wordIndex)
      if (!isNaN(idx)) goToWord(idx)
    }
  }

  return {
    guidedMode,
    currentIndex,
    totalWords,
    toggleGuided,
    nextWord,
    prevWord,
    goToWord,
    handleKeydown,
    handleWordClick
  }
}
