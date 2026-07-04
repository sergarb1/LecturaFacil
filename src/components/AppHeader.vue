<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()

const idiomas = [
  { codigo: 'es', nombre: 'Castellano' },
  { codigo: 'va', nombre: 'Valencià' },
  { codigo: 'ca', nombre: 'Català' },
  { codigo: 'eu', nombre: 'Euskera' },
  { codigo: 'gl', nombre: 'Galego' },
  { codigo: 'en', nombre: 'English' },
  { codigo: 'fr', nombre: 'Français' },
  { codigo: 'pt', nombre: 'Português' },
  { codigo: 'de', nombre: 'Deutsch' }
]

function cambiarIdioma(codigo) {
  locale.value = codigo
  localStorage.setItem('lf-idioma', codigo)
}

const enEditor = computed(() => route.name === 'editor')
const enAyuda = computed(() => route.name === 'help')
const enAcerca = computed(() => route.name === 'about')
</script>

<template>
  <header class="bg-gradient-to-r from-lf-600 via-lf-500 to-lf-400 text-white shadow-lg">
    <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-1 sm:gap-2">
      <router-link to="/" class="flex items-center gap-1 sm:gap-2 hover:opacity-90 transition flex-shrink-0">
        <img src="/icons/logo.svg" alt="LecturaFacil" class="h-6 sm:h-8 w-auto">
        <span class="hidden sm:inline text-xl font-bold tracking-tight">LecturaFacil</span>
      </router-link>

      <nav class="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm flex-shrink min-w-0 overflow-x-auto">
        <router-link to="/"
          class="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition flex items-center gap-1 whitespace-nowrap"
          :class="enEditor ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'">
          <span>✏️</span>
          <span class="hidden sm:inline">{{ t('nav.editor') }}</span>
        </router-link>
        <router-link to="/help"
          class="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition flex items-center gap-1 whitespace-nowrap"
          :class="enAyuda ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'">
          <span>❓</span>
          <span class="hidden sm:inline">{{ t('help.title') }}</span>
        </router-link>
        <router-link to="/about"
          class="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition flex items-center gap-1 whitespace-nowrap"
          :class="enAcerca ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'">
          <span>ℹ️</span>
          <span class="hidden sm:inline">{{ t('about.title') }}</span>
        </router-link>

        <span class="w-px h-4 sm:h-5 bg-white/20 mx-0.5 sm:mx-1"></span>

        <select v-model="locale"
          @change="cambiarIdioma($event.target.value)"
          class="bg-white/10 border border-white/20 rounded-lg px-1.5 sm:px-2 py-1 text-xs sm:text-sm text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 max-w-[80px] sm:max-w-none">
          <option v-for="idi in idiomas" :key="idi.codigo" :value="idi.codigo"
            class="text-gray-900">
            {{ idi.nombre }}
          </option>
        </select>
      </nav>
    </div>
  </header>
</template>
