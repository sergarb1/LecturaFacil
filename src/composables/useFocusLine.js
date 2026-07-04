import { ref, onMounted, onUnmounted } from 'vue'

const focusLineActive = ref(false)
let editorEl = null
let wrapperEl = null
let topOverlay = null
let bottomOverlay = null
let lineIndicator = null
let currentY = 0

export function useFocusLine() {
  function toggleFocusLine() {
    focusLineActive.value = !focusLineActive.value
    if (focusLineActive.value) {
      initOverlay()
    } else {
      removeOverlay()
    }
  }

  function initOverlay() {
    editorEl = document.querySelector('.editor-content')
    if (!editorEl) return
    wrapperEl = editorEl.closest('.editor-wrapper') || editorEl.parentElement
    if (!wrapperEl) return

    wrapperEl.style.position = 'relative'

    topOverlay = document.createElement('div')
    topOverlay.className = 'focus-line-overlay-top'

    bottomOverlay = document.createElement('div')
    bottomOverlay.className = 'focus-line-overlay-bottom'

    lineIndicator = document.createElement('div')
    lineIndicator.className = 'focus-line-indicator'

    wrapperEl.appendChild(topOverlay)
    wrapperEl.appendChild(bottomOverlay)
    wrapperEl.appendChild(lineIndicator)

    const rect = wrapperEl.getBoundingClientRect()
    currentY = rect.top + 80
    updatePosition()
  }

  function removeOverlay() {
    if (topOverlay) { topOverlay.remove(); topOverlay = null }
    if (bottomOverlay) { bottomOverlay.remove(); bottomOverlay = null }
    if (lineIndicator) { lineIndicator.remove(); lineIndicator = null }
    if (wrapperEl) wrapperEl.style.position = ''
    editorEl = null
    wrapperEl = null
  }

  function updatePosition() {
    if (!wrapperEl || !topOverlay || !bottomOverlay || !lineIndicator) return
    const rect = wrapperEl.getBoundingClientRect()
    const lineH = 44

    // Y relativa al wrapper
    const relativeY = currentY - rect.top
    const clampedY = Math.max(0, Math.min(relativeY, rect.height - lineH))

    // Overlay superior: desde top hasta clampedY
    topOverlay.style.top = '0'
    topOverlay.style.left = '0'
    topOverlay.style.right = '0'
    topOverlay.style.height = clampedY + 'px'

    // Overlay inferior: desde clampedY + lineH hasta bottom
    bottomOverlay.style.top = (clampedY + lineH) + 'px'
    bottomOverlay.style.left = '0'
    bottomOverlay.style.right = '0'
    bottomOverlay.style.height = (rect.height - clampedY - lineH) + 'px'

    // Indicador azul
    lineIndicator.style.top = (clampedY + lineH - 2) + 'px'
    lineIndicator.style.left = '0'
    lineIndicator.style.right = '0'
    lineIndicator.style.height = '2px'
  }

  function setLinePosition(clientY) {
    if (!wrapperEl) return
    const rect = wrapperEl.getBoundingClientRect()
    currentY = clientY
    updatePosition()
  }

  function moveLineUp() {
    if (!wrapperEl) return
    currentY = Math.max(0, currentY - 44)
    updatePosition()
  }

  function moveLineDown() {
    if (!wrapperEl) return
    const rect = wrapperEl.getBoundingClientRect()
    currentY = Math.min(rect.bottom - 44, currentY + 44)
    updatePosition()
  }

  return {
    focusLineActive,
    toggleFocusLine,
    moveLineUp,
    moveLineDown,
    setLinePosition
  }
}
