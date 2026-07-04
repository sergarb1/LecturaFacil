<script setup>
import { ref, onMounted } from 'vue'

const showPrompt = ref(false)
const deferredPrompt = ref(null)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    showPrompt.value = true
  })
  window.addEventListener('appinstalled', () => {
    showPrompt.value = false
    deferredPrompt.value = null
  })
})

async function install() {
  if (!deferredPrompt.value) return
  deferredPrompt.value.prompt()
  const result = await deferredPrompt.value.userChoice
  if (result.outcome === 'accepted') {
    showPrompt.value = false
  }
  deferredPrompt.value = null
}

function dismiss() {
  showPrompt.value = false
  deferredPrompt.value = null
}
</script>

<template>
  <Teleport to="body">
    <div v-if="showPrompt"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div class="bg-white rounded-2xl shadow-xl border border-lf-200 p-4 flex items-center gap-4 max-w-md">
        <span class="text-3xl">📚</span>
        <div class="flex-1 min-w-0">
          <p class="font-semibold text-gray-800 text-sm">Instala LecturaFacil</p>
          <p class="text-xs text-gray-500">Accede sin conexión desde tu dispositivo</p>
        </div>
        <button @click="install"
          class="px-4 py-2 bg-lf-600 text-white text-sm font-medium rounded-xl hover:bg-lf-700 transition whitespace-nowrap">
          Instalar
        </button>
        <button @click="dismiss" class="text-gray-400 hover:text-gray-600 transition text-xl leading-none">&times;</button>
      </div>
    </div>
  </Teleport>
</template>
