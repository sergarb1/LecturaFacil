<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const inputRef = ref(null)

const emit = defineEmits(['import'])

function handleFile(e) {
  const file = e.target.files[0]
  if (file) {
    emit('import', file)
    e.target.value = ''
  }
}
</script>

<template>
  <label class="btn-access cursor-pointer">
    <span>📄</span>
    <span class="hidden sm:inline">Word</span>
    <input ref="inputRef" type="file" accept=".docx" @change="handleFile" class="hidden">
  </label>
</template>
