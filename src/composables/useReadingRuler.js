import { ref } from 'vue'

const rulerActive = ref(false)
const rulerY = ref(0)

export function useReadingRuler() {
  function toggleRuler() {
    rulerActive.value = !rulerActive.value
  }

  function setRulerPosition(clientY) {
    if (!rulerActive.value) return
    const editor = document.querySelector('.editor-wrapper')
    if (!editor) return
    const rect = editor.getBoundingClientRect()
    rulerY.value = clientY - rect.top
  }

  return { rulerActive, rulerY, toggleRuler, setRulerPosition }
}
