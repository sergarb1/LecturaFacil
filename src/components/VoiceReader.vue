<script setup>
import { useSpeech } from '../composables/useSpeech.js'
import { useI18n } from 'vue-i18n'

const { speak, stop, pause, resume, isSpeaking, isPaused, speed, setSpeed } = useSpeech()
const { t, locale } = useI18n()

const props = defineProps({
  text: { type: String, default: '' }
})

function handlePlay() {
  const content = props.text || document.querySelector('.editor-content')?.innerText || ''
  if (content.trim()) speak(content, speed.value, locale.value)
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-3">
    <h3 class="font-semibold text-gray-700">Lectura con voz</h3>

    <div class="flex items-center gap-2">
      <button @click="handlePlay" :disabled="isSpeaking && !isPaused"
        class="px-4 py-2 bg-lf-600 text-white rounded-lg hover:bg-lf-700 disabled:opacity-50 text-sm font-medium">
        {{ isPaused ? t('voice.resume') : t('voice.play') }}
      </button>
      <button @click="pause" :disabled="!isSpeaking || isPaused"
        class="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 text-sm font-medium">
        {{ t('voice.pause') }}
      </button>
      <button @click="stop"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium">
        {{ t('voice.stop') }}
      </button>
    </div>

    <div class="flex items-center gap-3 text-sm">
      <span class="text-gray-500">{{ t('voice.speed') }}:</span>
      <input type="range" min="0.5" max="2" step="0.1" :value="speed"
        @input="setSpeed(parseFloat($event.target.value))"
        class="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lf-500">
      <span class="text-gray-700 font-medium w-10">{{ speed }}x</span>
    </div>
  </div>
</template>
