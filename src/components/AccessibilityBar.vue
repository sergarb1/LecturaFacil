<script setup>
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSpeech } from '../composables/useSpeech.js'
import { usePictogram } from '../composables/usePictogram.js'
import { useFocusLine } from '../composables/useFocusLine.js'
import { useGuidedReading } from '../composables/useGuidedReading.js'
import { useReadingRuler } from '../composables/useReadingRuler.js'
import { useTheme } from '../composables/useTheme.js'
import { useDocx } from '../composables/useDocx.js'
import { useOCR } from '../composables/useOCR.js'
import ColorPerLetterToggle from './ColorPerLetterToggle.vue'
import VoiceReader from './VoiceReader.vue'
import DocxImporter from './DocxImporter.vue'
import PdfImporter from './PdfImporter.vue'
import OCRUploader from './OCRUploader.vue'

const editorState = inject('editorState')
const { t } = useI18n()
const { speak, stop, isSpeaking, speed, setSpeed } = useSpeech()
const { pictogramMode, togglePictogram } = usePictogram()
const { focusLineActive, toggleFocusLine } = useFocusLine()
const { guidedMode, toggleGuided } = useGuidedReading()
const { rulerActive, toggleRuler } = useReadingRuler()
const { themes, activeTheme, applyTheme } = useTheme()
const { importDocx } = useDocx()
const { ocrImage, isProcessing } = useOCR()
const showColorPanel = ref(false)
const showThemePanel = ref(false)

function toggleReaderMode() {
  editorState.readerMode = !editorState.readerMode
}

function handleSpeak() {
  if (isSpeaking.value) {
    stop()
    editorState.isSpeaking = false
  } else {
    const text = editorState.content.replace(/<[^>]*>/g, '')
    if (text.trim()) {
      speak(text, speed.value)
      editorState.isSpeaking = true
    }
  }
}

async function handleDocx(file) {
  const html = await importDocx(file)
  if (html) {
    const editor = document.querySelector('.editor-content')
    if (editor) {
      editor.innerHTML = html
      editorState.content = html
    }
  }
}

async function handlePdf(text) {
  if (text) {
    const editor = document.querySelector('.editor-content')
    if (editor) {
      editor.innerHTML = text.replace(/\n/g, '<br>')
      editorState.content = editor.innerHTML
    }
  }
}

async function handleOCR(file) {
  const text = await ocrImage(file)
  if (text) {
    const editor = document.querySelector('.editor-content')
    if (editor) {
      editor.innerHTML = text.replace(/\n/g, '<br>')
      editorState.content = editor.innerHTML
    }
  }
}

function handleSpeedChange(e) {
  setSpeed(parseFloat(e.target.value))
}

function toggleDictionary() {
  editorState.dictionaryMode = !editorState.dictionaryMode
}

async function compartirTexto() {
  const text = (editorState.content || '').replace(/<[^>]*>/g, '').trim()
  if (!text) return
  if (navigator.share) {
    try {
      await navigator.share({ title: 'LecturaFacil', text })
    } catch (e) { /* user cancelled */ }
  } else {
    await navigator.clipboard.writeText(text)
    alert('Texto copiado al portapapeles')
  }
}
</script>

<template>
  <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-lf-100 p-3 flex flex-wrap items-center gap-1.5">
    <!-- Modo lectura -->
    <button @click="toggleReaderMode"
      class="btn-access"
      :class="{ active: editorState.readerMode }">
      <span>📖</span>
      <span class="hidden sm:inline">{{ t('accessibility.readerMode') }}</span>
    </button>

    <!-- Lectura guiada -->
    <button @click="toggleGuided"
      class="btn-access"
      :class="{ active: guidedMode }">
      <span>🔤</span>
      <span class="hidden sm:inline">{{ t('accessibility.guidedReading') }}</span>
    </button>

    <!-- Diccionario -->
    <button @click="toggleDictionary"
      class="btn-access"
      :class="{ active: editorState.dictionaryMode }">
      <span>📖</span>
      <span class="hidden sm:inline">{{ editorState.dictionaryMode ? t('accessibility.hideDictionary') : t('accessibility.dictionary') }}</span>
    </button>

    <!-- Regla de lectura -->
    <button @click="toggleRuler"
      class="btn-access"
      :class="{ active: rulerActive }">
      <span>📏</span>
      <span class="hidden sm:inline">Regla</span>
    </button>

    <!-- Línea de enfoque -->
    <button @click="toggleFocusLine"
      class="btn-access"
      :class="{ active: focusLineActive }">
      <span>👁️</span>
      <span class="hidden sm:inline">Línea</span>
    </button>

    <!-- Leer en voz alta -->
    <button @click="handleSpeak"
      class="btn-access"
      :class="{ active: isSpeaking }">
      <span>{{ isSpeaking ? '⏹️' : '🔊' }}</span>
      <span class="hidden sm:inline">{{ isSpeaking ? t('accessibility.stop') : t('accessibility.read') }}</span>
    </button>

    <!-- Velocidad voz -->
    <div v-if="isSpeaking" class="flex items-center gap-2 text-sm ml-1 px-2">
      <span class="text-gray-400">🐢</span>
      <input type="range" min="0.5" max="2" step="0.1" :value="speed"
        @input="handleSpeedChange"
        class="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lf-500">
      <span class="text-gray-600 font-medium w-8 text-xs">{{ speed }}x</span>
      <span class="text-gray-400">🐇</span>
    </div>

    <span class="w-px h-6 bg-lf-100 mx-1"></span>

    <!-- Color por letra -->
    <button @click="showColorPanel = !showColorPanel"
      class="btn-access"
      :class="{ active: editorState.colorPerLetter }">
      <span>🎨</span>
      <span class="hidden sm:inline">{{ t('accessibility.colorPerLetter') }}</span>
    </button>

    <!-- Pictogramas -->
    <button @click="togglePictogram"
      class="btn-access"
      :class="{ active: pictogramMode }">
      <span>🖼️</span>
      <span class="hidden sm:inline">{{ t('accessibility.pictograms') }}</span>
    </button>

    <!-- Temas -->
    <button @click="showThemePanel = !showThemePanel"
      class="btn-access"
      :class="{ active: showThemePanel }">
      <span>{{ activeTheme.icon }}</span>
      <span class="hidden sm:inline">{{ activeTheme.label }}</span>
    </button>

    <!-- Compartir -->
    <button @click="compartirTexto"
      class="btn-access">
      <span>📤</span>
      <span class="hidden sm:inline">Compartir</span>
    </button>

    <span class="w-px h-6 bg-lf-100 mx-1"></span>

    <!-- Importar DOCX -->
    <DocxImporter @import="handleDocx" />

    <!-- Importar PDF -->
    <PdfImporter @import="handlePdf" />

    <!-- OCR -->
    <OCRUploader @ocr="handleOCR" :processing="isProcessing" />

    <ColorPerLetterToggle v-if="showColorPanel" />

    <!-- Panel temas -->
    <div v-if="showThemePanel" class="w-full bg-gray-50 rounded-lg p-3 animate-fade-in space-y-1.5">
      <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Tema visual</label>
      <div class="flex flex-wrap gap-1.5">
        <button v-for="(t, key) in themes" :key="key"
          @click="applyTheme(key); showThemePanel = false"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition"
          :class="activeTheme.label === t.label ? 'bg-lf-100 border-lf-300 text-lf-700 font-medium' : 'bg-white border-gray-200 hover:border-lf-200'">
          <span>{{ t.icon }}</span>
          <span>{{ t.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
