import { ref } from 'vue'

export function useDocx() {
  const loading = ref(false)
  const error = ref(null)

  async function importDocx(file) {
    loading.value = true
    error.value = null

    try {
      const arrayBuffer = await file.arrayBuffer()
      const mammoth = await import('mammoth')
      const result = await mammoth.convertToHtml({ arrayBuffer })

      if (result.value) {
        return result.value
      }
      return null
    } catch (err) {
      error.value = 'Error al importar el archivo: ' + err.message
      return null
    } finally {
      loading.value = false
    }
  }

  return { importDocx, loading, error }
}
