import { ref } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

// Configurar worker de PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

export function usePdf() {
  const loading = ref(false)
  const error = ref(null)
  const progress = ref(0)

  async function importPdf(file) {
    loading.value = true
    error.value = null
    progress.value = 0

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let fullText = ''

      for (let i = 1; i <= pdf.numPages; i++) {
        progress.value = Math.round((i / pdf.numPages) * 100)
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const pageText = content.items.map(item => item.str).join(' ')
        fullText += pageText + '\n\n'
      }

      progress.value = 100
      return fullText.trim()
    } catch (err) {
      error.value = 'Error al importar PDF: ' + err.message
      return null
    } finally {
      loading.value = false
      progress.value = 0
    }
  }

  return { importPdf, loading, error, progress }
}
