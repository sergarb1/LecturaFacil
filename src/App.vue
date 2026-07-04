<script setup>
import AppHeader from './components/AppHeader.vue'
import PwaInstallPrompt from './components/PwaInstallPrompt.vue'
import { useDB } from './composables/useDB.js'
import { useTheme } from './composables/useTheme.js'
import { useI18n } from 'vue-i18n'
import { onMounted, watch } from 'vue'

const { locale, t } = useI18n()
const { initTheme } = useTheme()

watch(locale, (lang) => {
  document.documentElement.lang = lang
}, { immediate: true })

onMounted(() => {
  useDB().init()
  initTheme()
  // Restaurar idioma guardado
  const saved = localStorage.getItem('lf-idioma')
  if (saved && ['es','va','ca','eu','gl','en','fr','pt','de'].includes(saved)) {
    locale.value = saved
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-white to-lf-50">
    <AppHeader />
    <main class="flex-1">
      <router-view />
    </main>
    <PwaInstallPrompt />
    <footer class="bg-lf-900 text-white/60 text-xs py-6 mt-12">
      <div class="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <img src="/icons/logo.svg" alt="LecturaFacil" class="h-5 w-auto opacity-70">
          <span>LecturaFacil — Editor de texto inclusivo</span>
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/help" class="hover:text-white transition">{{ t('help.title') }}</router-link>
          <router-link to="/about" class="hover:text-white transition">{{ t('about.title') }}</router-link>
          <a href="https://mejoratudocencia.es" target="_blank" rel="noopener" class="hover:text-white transition">mejoratudocencia.es</a>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 mt-3 pt-3 border-t border-white/10 text-[10px] text-white/40 leading-relaxed">
        <p>✅ Siempre gratis · Tus datos no suben a internet · Cumple GDPR · <a href="/#/about" class="hover:text-white/60 transition">Más info</a></p>
        <p>Pictogramas: Gobierno de Aragón — Sergio Palao — <a href="https://arasaac.org" target="_blank" rel="noopener" class="hover:text-white/60 transition">ARASAAC</a> (CC BY-NC-SA).</p>
        <p>OpenDyslexic: Abelardo González · <a href="https://opendyslexic.org" target="_blank" rel="noopener" class="hover:text-white/60 transition">opendyslexic.org</a> (SIL OFL).</p>
        <p>Atkinson Hyperlegible: <a href="https://brailleinstitute.org/freefont" target="_blank" rel="noopener" class="hover:text-white/60 transition">Braille Institute</a> · Lexend: <a href="https://lexend.com" target="_blank" rel="noopener" class="hover:text-white/60 transition">lexend.com</a> · Comic Neue: <a href="https://comicneue.com" target="_blank" rel="noopener" class="hover:text-white/60 transition">comicneue.com</a> (SIL OFL).</p>
      </div>
    </footer>
  </div>
</template>
