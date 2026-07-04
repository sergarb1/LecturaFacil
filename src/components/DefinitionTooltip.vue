<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  definition: Object,
  loading: Boolean,
  error: String,
  visible: Boolean
})

const emit = defineEmits(['close'])
const { t } = useI18n()
const tooltipRef = ref(null)
let ready = false

function handleDocumentClick(e) {
  if (!ready) return
  if (tooltipRef.value && !tooltipRef.value.contains(e.target)) {
    emit('close')
  }
}

watch(() => props.visible, (val) => {
  if (val) {
    nextTick(() => { ready = true })
  } else {
    ready = false
  }
}, { immediate: true })

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

watch(() => props.definition, (val) => {
  if (val) {
    nextTick(() => tooltipRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }))
  }
})
</script>

<template>
  <Teleport to="body">
    <div v-if="visible"
      ref="tooltipRef"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[90vw] bg-white rounded-2xl shadow-2xl border-2 border-lf-200 p-5 animate-fade-in">
      <button @click="emit('close')"
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-lg leading-none">&times;</button>

      <div v-if="loading" class="flex items-center gap-3 text-gray-500 py-2">
        <span class="inline-block w-4 h-4 border-2 border-lf-300 border-t-transparent rounded-full animate-spin"></span>
        <span class="text-sm">Buscando definición...</span>
      </div>

      <div v-else-if="error" class="text-gray-500 text-sm py-2">
        {{ error }}
      </div>

      <div v-else-if="definition" class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="text-2xl leading-none text-lf-500">📖</span>
          <span class="font-bold text-lg text-gray-800">{{ definition.word }}</span>
          <span v-if="definition.phonetic" class="text-sm text-gray-400">{{ definition.phonetic }}</span>
        </div>
        <p class="text-gray-700 leading-relaxed text-base mt-1">
          {{ definition.definition }}
        </p>
        <div class="flex items-center gap-2 mt-2">
          <span class="text-[10px] uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
            {{ definition.source === 'online' ? t('editor.onlineSource') : t('editor.offlineSource') }}
          </span>
        </div>
      </div>

      <div v-else class="text-gray-400 text-sm py-2">
        {{ t('editor.noDefinition') }}
      </div>
    </div>
  </Teleport>
</template>
