<script setup>
import { inject, ref, watch, nextTick } from 'vue'
import { useColorPerLetter } from '../composables/useColorPerLetter.js'

const editorState = inject('editorState')
const { getPresets, applyColorPerLetter, removeColorPerLetter } = useColorPerLetter()

const presets = getPresets()
const presetKeys = Object.keys(presets)
const activePreset = ref('arcoiris')

function toggleColorPerLetter() {
  editorState.colorPerLetter = !editorState.colorPerLetter
  if (editorState.colorPerLetter) {
    nextTick(() => applyCurrentPreset())
  } else {
    const editor = document.querySelector('.editor-content')
    if (editor) removeColorPerLetter(editor)
  }
}

function applyCurrentPreset() {
  if (!editorState.colorPerLetter) return
  const editor = document.querySelector('.editor-content')
  if (!editor) return
  removeColorPerLetter(editor)
  const colors = presets[activePreset.value].colors
  applyColorPerLetter(editor, colors)
  editorState.letterColors = { ...colors }
}

function selectPreset(key) {
  activePreset.value = key
  if (editorState.colorPerLetter) {
    applyCurrentPreset()
  }
}
</script>

<template>
  <div class="w-full bg-gray-50 rounded-lg p-3 space-y-3 animate-fade-in">
    <label class="flex items-center gap-2 text-sm cursor-pointer">
      <input type="checkbox" :checked="editorState.colorPerLetter" @change="toggleColorPerLetter"
        class="w-4 h-4 accent-lf-500 rounded">
      <span class="font-medium">Color por letra</span>
    </label>

    <div v-if="editorState.colorPerLetter" class="space-y-3">
      <!-- Selector de preset -->
      <div class="space-y-1.5">
        <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">Esquema de colores</label>
        <div class="grid grid-cols-2 gap-1.5">
          <button v-for="(pre, key) in presets" :key="key"
            @click="selectPreset(key)"
            class="text-left px-2.5 py-2 rounded-lg text-xs border transition text-gray-600"
            :class="activePreset === key ? 'bg-lf-100 border-lf-300 text-lf-700 font-medium' : 'bg-white border-gray-200 hover:border-lf-200'">
            <div class="font-semibold">{{ pre.label }}</div>
            <div class="text-[10px] opacity-70 mt-0.5">{{ pre.desc }}</div>
          </button>
        </div>
      </div>

      <!-- Previsualización letras -->
      <div class="flex flex-wrap gap-1">
        <span v-for="letra in 'abcdefghijklmnopqrstuvwxyz'"
          :key="letra"
          class="text-sm font-bold"
          :style="{ color: presets[activePreset].colors[letra] }">
          {{ letra.toUpperCase() }}
        </span>
      </div>
    </div>
  </div>
</template>
