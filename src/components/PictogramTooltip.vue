<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePictogram } from '../composables/usePictogram.js'

const { findPictogram } = usePictogram()
const tooltip = ref({ show: false, word: '', image: '', x: 0, y: 0 })

let mouseHandler = null

onMounted(() => {
  mouseHandler = (e) => {
    const word = e.target?.closest('[data-pictogram]')
    if (word) {
      const picto = findPictogram(word.dataset.word)
      if (picto) {
        const rect = word.getBoundingClientRect()
        tooltip.value = {
          show: true,
          word: word.dataset.word,
          image: picto.image,
          x: rect.left + rect.width / 2,
          y: rect.top
        }
      }
    } else {
      tooltip.value.show = false
    }
  }
  document.addEventListener('mouseover', mouseHandler)
})

onUnmounted(() => {
  if (mouseHandler) document.removeEventListener('mouseover', mouseHandler)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="tooltip.show"
      class="fixed z-50 pointer-events-none animate-fade-in"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px', transform: 'translate(-50%, -100%)' }">
      <div class="bg-white border-2 border-lf-300 rounded-xl px-3 py-2 shadow-lg text-center">
        <img v-if="tooltip.image" :src="tooltip.image" :alt="tooltip.word" class="w-12 h-12 mx-auto object-contain">
        <p class="text-xs text-gray-500 mt-1">{{ tooltip.word }}</p>
      </div>
    </div>
  </Teleport>
</template>
