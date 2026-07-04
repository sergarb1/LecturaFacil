<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const inputRef = ref(null)
const emit = defineEmits(['ocr'])

defineProps({
  processing: { type: Boolean, default: false }
})

function handleFile(e) {
  const file = e.target.files[0]
  if (file) {
    emit('ocr', file)
    e.target.value = ''
  }
}
</script>

<template>
  <label class="btn-access cursor-pointer"
    :class="{ 'opacity-50 pointer-events-none': processing }">
    <span>{{ processing ? '⏳' : '📷' }}</span>
    <span class="hidden sm:inline">{{ processing ? t('accessibility.processingOCR') : 'OCR' }}</span>
    <input ref="inputRef" type="file" accept="image/*" @change="handleFile" class="hidden">
  </label>
</template>
