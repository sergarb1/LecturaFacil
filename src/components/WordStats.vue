<script setup>
import { inject, computed } from 'vue'

const editorState = inject('editorState')

const stats = computed(() => {
  const text = (editorState.content || '').replace(/<[^>]*>/g, '')
  const chars = text.length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text ? text.split('\n').length : 0
  const readingTime = words > 0 ? Math.max(1, Math.round(words / 200)) : 0
  return { chars, words, lines, readingTime }
})
</script>

<template>
  <div class="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 text-xs text-gray-400 border-t border-gray-100 bg-white/50 overflow-x-auto">
    <span class="flex items-center gap-1 whitespace-nowrap">
      <span class="text-gray-300">📝</span>
      <span><strong class="text-gray-500">{{ stats.words }}</strong> palabras</span>
    </span>
    <span class="w-px h-3 bg-gray-200"></span>
    <span class="flex items-center gap-1 whitespace-nowrap">
      <span class="text-gray-300">🔤</span>
      <span><strong class="text-gray-500">{{ stats.chars }}</strong> caracteres</span>
    </span>
    <span class="w-px h-3 bg-gray-200 hidden sm:inline-block"></span>
    <span class="hidden sm:flex items-center gap-1 whitespace-nowrap">
      <span class="text-gray-300">📏</span>
      <span><strong class="text-gray-500">{{ stats.lines }}</strong> líneas</span>
    </span>
    <span class="w-px h-3 bg-gray-200 hidden sm:inline-block"></span>
    <span class="hidden sm:flex items-center gap-1 whitespace-nowrap">
      <span class="text-gray-300">⏱️</span>
      <span><strong class="text-gray-500">{{ stats.readingTime }}</strong> min</span>
    </span>
  </div>
</template>
