<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePdf } from '../composables/usePdf.js'

const emit = defineEmits(['import'])
const { t } = useI18n()
const { importPdf, loading, error, progress } = usePdf()
const inputRef = ref(null)

async function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const text = await importPdf(file)
  if (text) emit('import', text)
  if (inputRef.value) inputRef.value.value = ''
}
</script>

<template>
  <div class="relative">
    <input ref="inputRef" type="file" accept=".pdf" @change="onFileChange" class="hidden">
    <button @click="inputRef?.click()" :disabled="loading"
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition"
      :class="loading ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'">
      <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
      <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      {{ loading ? t('accessibility.processingOCR') : 'PDF' }}
    </button>
    <div v-if="loading" class="absolute top-full left-0 mt-1 w-full bg-gray-200 rounded-full h-1">
      <div class="bg-lf-500 h-1 rounded-full transition-all" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>
