import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

import es from './locales/es.js'
import va from './locales/va.js'
import ca from './locales/ca.js'
import eu from './locales/eu.js'
import gl from './locales/gl.js'
import en from './locales/en.js'
import fr from './locales/fr.js'
import pt from './locales/pt.js'
import de from './locales/de.js'

const messages = { es, va, ca, eu, gl, en, fr, pt, de }

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages
})

const routes = [
  {
    path: '/',
    name: 'editor',
    component: () => import('./views/EditorView.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('./views/HelpView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')
