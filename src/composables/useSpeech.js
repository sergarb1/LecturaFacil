import { ref } from 'vue'

const isSpeaking = ref(false)
const isPaused = ref(false)
const speed = ref(1)
let currentText = ''
let utterance = null
let currentWordIndex = 0

function highlightWord(index) {
  const editor = document.querySelector('.editor-content')
  if (!editor) return

  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT)
  const positions = []
  while (walker.nextNode()) {
    const nodeText = walker.currentNode.textContent
    const nodeWords = nodeText.split(/\s+/)
    for (let i = 0; i < nodeWords.length; i++) {
      if (nodeWords[i].length > 0) {
        positions.push({ node: walker.currentNode, wordIndex: i })
      }
    }
  }

  editor.querySelectorAll('.lf-highlight').forEach(el => {
    const parent = el.parentNode
    parent.replaceChild(document.createTextNode(el.textContent), el)
    parent.normalize()
  })

  if (index >= 0 && index < positions.length) {
    const pos = positions[index]
    const span = document.createElement('span')
    span.className = 'lf-highlight'
    const fullText = pos.node.textContent
    const textWords = fullText.split(/\s+/)
    span.textContent = textWords[pos.wordIndex]
    const parent = pos.node.parentNode

    let charIndex = 0
    for (let i = 0; i < pos.wordIndex; i++) {
      charIndex += textWords[i].length + 1
    }
    const before = document.createTextNode(fullText.slice(0, charIndex))
    const after = fullText.slice(charIndex + textWords[pos.wordIndex].length)
    parent.insertBefore(before, pos.node)
    parent.insertBefore(span, pos.node)
    if (after.length > 0) {
      pos.node.textContent = after
    } else {
      pos.node.remove()
    }
    span.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

function cleanHighlights() {
  document.querySelectorAll('.lf-highlight').forEach(el => {
    const parent = el.parentNode
    parent.replaceChild(document.createTextNode(el.textContent), el)
    parent.normalize()
  })
}

export function useSpeech() {
  function speak(text, rate = 1) {
    if (!text) return
    window.speechSynthesis.cancel()
    isPaused.value = false
    cleanHighlights()

    currentText = text
    const plainText = text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
    if (!plainText) return

    currentWordIndex = 0
    speed.value = rate

    utterance = new SpeechSynthesisUtterance(plainText)
    utterance.rate = rate
    utterance.pitch = 1
    utterance.volume = 1

    const voices = window.speechSynthesis.getVoices()
    const spanishVoice = voices.find(v => v.lang.startsWith('es'))
    if (spanishVoice) utterance.voice = spanishVoice

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        highlightWord(currentWordIndex)
        currentWordIndex++
      }
    }

    utterance.onend = () => {
      isSpeaking.value = false
      isPaused.value = false
      cleanHighlights()
    }

    utterance.onerror = () => {
      isSpeaking.value = false
      isPaused.value = false
    }

    isSpeaking.value = true
    window.speechSynthesis.speak(utterance)
  }

  function stop() {
    window.speechSynthesis.cancel()
    isSpeaking.value = false
    isPaused.value = false
    cleanHighlights()
  }

  function pause() {
    if (isSpeaking.value && !isPaused.value) {
      window.speechSynthesis.pause()
      isPaused.value = true
    }
  }

  function resume() {
    if (isPaused.value) {
      window.speechSynthesis.resume()
      isPaused.value = false
    }
  }

  function setSpeed(val) {
    speed.value = val
    if (isSpeaking.value && currentText) {
      const text = currentText
      const wasPaused = isPaused.value
      window.speechSynthesis.cancel()
      isSpeaking.value = false
      isPaused.value = false
      cleanHighlights()
      speak(text, val)
    }
  }

  return { isSpeaking, isPaused, speed, speak, stop, pause, resume, setSpeed }
}
