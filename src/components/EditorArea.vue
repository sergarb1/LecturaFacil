<script setup>
import { inject, computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useColorPerLetter } from '../composables/useColorPerLetter.js'
import { usePictogram } from '../composables/usePictogram.js'
import { useDB } from '../composables/useDB.js'
import { useFocusLine } from '../composables/useFocusLine.js'
import { useGuidedReading } from '../composables/useGuidedReading.js'
import { useReadingRuler } from '../composables/useReadingRuler.js'
import WordStats from './WordStats.vue'

const editorState = inject('editorState')
const { t } = useI18n()
const editorRef = ref(null)
const { getPresets, applyColorPerLetter, removeColorPerLetter } = useColorPerLetter()
const { pictogramMode, findPictograms } = usePictogram()
const { focusLineActive, setLinePosition } = useFocusLine()
const { guidedMode, currentIndex, totalWords, handleKeydown, handleWordClick, nextWord, prevWord, toggleGuided } = useGuidedReading()
const { rulerActive, rulerY, setRulerPosition } = useReadingRuler()

const editorStyle = computed(() => ({
  fontFamily: editorState.font,
  fontSize: editorState.fontSize + 'px',
  lineHeight: editorState.readerMode ? '2.2' : '1.8',
  letterSpacing: editorState.readerMode ? '0.05em' : 'normal',
  wordSpacing: editorState.readerMode ? '0.15em' : 'normal'
}))

onMounted(async () => {
  const db = useDB()
  const saved = await db.loadContent()
  if (saved && editorRef.value) {
    editorRef.value.innerHTML = saved
    editorState.content = saved
  }
  editorRef.value?.focus()

  // Sincronizar guidedMode desde el estado global
  watch(() => editorState.guidedMode, (val) => {
    if (val !== guidedMode.value) {
      toggleGuided()
    }
  })
})

watch(() => editorState.colorPerLetter, async (val) => {
  await nextTick()
  if (!editorRef.value) return
  if (val) {
    const preset = getPresets()['arcoiris']
    const colors = { ...(editorState.letterColors || preset.colors) }
    applyColorPerLetter(editorRef.value, colors)
  } else {
    removeColorPerLetter(editorRef.value)
  }
})

watch(() => editorState.font, async () => {
  await nextTick()
  if (editorRef.value) {
    editorRef.value.focus()
  }
})

function onInput() {
  if (!editorRef.value) return
  editorState.content = editorRef.value.innerHTML
  const db = useDB()
  db.saveContent(editorState.content)
}

function onKeydown(e) {
  if (guidedMode.value) {
    handleKeydown(e)
    return
  }
  if (e.key === 'Enter' && !e.shiftKey) {
    document.execCommand('insertLineBreak')
    e.preventDefault()
  }
}

async function onClick(e) {
  if (rulerActive.value) {
    setRulerPosition(e.clientY)
  }
  if (focusLineActive.value) {
    setLinePosition(e.clientY)
  }

  if (guidedMode.value) {
    handleWordClick(e)
    return
  }

  if (editorState.readerMode) {
    const selection = window.getSelection()
    const selected = selection?.toString().trim()
    if (selected && selected.length > 0 && selected.length < 50) {
      // solo en readerMode, selección permitida
    }
  }
}

</script>

<template>
  <div
    :class="['bg-white rounded-xl shadow-sm border border-gray-200 min-h-[400px] relative editor-wrapper', { 'reader-mode': editorState.readerMode }]">
    <div
      ref="editorRef"
      class="editor-content w-full h-full p-6 overflow-auto focus:outline-none"
      :class="{ 'guided-reading': guidedMode }"
      :style="editorStyle"
      :contenteditable="!guidedMode"
      @input="onInput"
      @keydown="onKeydown"
      @click="onClick">
    </div>

    <!-- Barra de progreso lectura guiada -->
    <div v-if="guidedMode && totalWords > 0" class="guided-progress">
      <button @click="prevWord"
        class="text-lf-500 hover:text-lf-700 text-lg font-bold leading-none px-1">◀</button>
      <span class="text-sm text-gray-600 font-medium whitespace-nowrap min-w-[4rem] text-center">
        {{ currentIndex + 1 }} / {{ totalWords }}
      </span>
      <button @click="nextWord"
        class="text-lf-500 hover:text-lf-700 text-lg font-bold leading-none px-1">▶</button>
      <div class="guided-progress-bar">
        <div class="guided-progress-fill"
          :style="{ width: ((currentIndex + 1) / totalWords * 100) + '%' }">
        </div>
      </div>
    </div>

    <!-- Regla de lectura -->
    <div v-if="rulerActive"
      class="pointer-events-none absolute left-0 right-0 z-10 h-8 bg-lf-300/20 border-t-2 border-b-2 border-lf-400"
      :style="{ top: rulerY - 16 + 'px' }">
    </div>

    <!-- Estadísticas -->
    <WordStats />

  </div>
</template>
