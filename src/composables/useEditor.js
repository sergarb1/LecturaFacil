import { ref } from 'vue'
import { useDB } from './useDB.js'

const content = ref('')
const font = ref('OpenDyslexic')
const fontSize = ref(18)
const readerMode = ref(false)

export function useEditor() {
  const db = useDB()

  async function loadContent() {
    const saved = await db.loadContent()
    if (saved) content.value = saved
    return saved
  }

  async function saveContent(html) {
    content.value = html
    await db.saveContent(html)
  }

  function clearContent() {
    content.value = ''
  }

  return {
    content,
    font,
    fontSize,
    readerMode,
    loadContent,
    saveContent,
    clearContent
  }
}
