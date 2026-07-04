import { ref } from 'vue'

export function useOCR() {
  const isProcessing = ref(false)
  const error = ref(null)
  const progress = ref(0)

  async function ocrImage(file) {
    isProcessing.value = true
    error.value = null
    progress.value = 0

    try {
      const Tesseract = await import('tesseract.js')
      const { data } = await Tesseract.recognize(
        file,
        'spa',
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              progress.value = Math.round(m.progress * 100)
            }
          }
        }
      )

      if (data && data.text) {
        return data.text
      }
      return null
    } catch (err) {
      error.value = 'Error al procesar la imagen: ' + err.message
      return null
    } finally {
      isProcessing.value = false
      progress.value = 0
    }
  }

  return { ocrImage, isProcessing, error, progress }
}
