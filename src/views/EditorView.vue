<script setup>
import EditorToolbar from '../components/EditorToolbar.vue'
import EditorArea from '../components/EditorArea.vue'
import AccessibilityBar from '../components/AccessibilityBar.vue'
import { provide, reactive } from 'vue'

const editorState = reactive({
  content: '',
  font: 'OpenDyslexic',
  fontSize: 22,
  colorPerLetter: false,
  letterColors: {},
  pictogramMode: false,
  readerMode: false,
  isSpeaking: false,
  speechSpeed: 1,
  guidedMode: false,
  dictionaryMode: false
})

provide('editorState', editorState)
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-6 space-y-4">
    <AccessibilityBar />
    <EditorToolbar />
    <EditorArea />
  </div>
</template>
