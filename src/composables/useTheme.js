import { ref, watch } from 'vue'

const STORAGE_KEY = 'lf-tema'

const themes = {
  claro: {
    label: 'Claro',
    icon: '☀️',
    vars: {
      '--bg-page': '#fcf9ec',
      '--bg-editor': '#fefbe6',
      '--bg-card': '#ffffff',
      '--text-primary': '#1e293b',
      '--text-secondary': '#4b5563',
      '--text-muted': '#9ca3af',
      '--border': '#e5e7eb',
      '--border-accent': '#ddd6fe',
      '--accent': '#8b5cf6',
      '--accent-light': '#ede9fe',
      '--overlay': 'rgba(0,0,0,0.35)'
    }
  },
  oscuro: {
    label: 'Oscuro',
    icon: '🌙',
    vars: {
      '--bg-page': '#0f172a',
      '--bg-editor': '#1e293b',
      '--bg-card': '#1e293b',
      '--text-primary': '#e2e8f0',
      '--text-secondary': '#94a3b8',
      '--text-muted': '#64748b',
      '--border': '#334155',
      '--border-accent': '#4c1d95',
      '--accent': '#a78bfa',
      '--accent-light': '#2e1065',
      '--overlay': 'rgba(0,0,0,0.5)'
    }
  },
  sepia: {
    label: 'Sepia',
    icon: '🟫',
    vars: {
      '--bg-page': '#f4ecd8',
      '--bg-editor': '#faf0dc',
      '--bg-card': '#faf0dc',
      '--text-primary': '#3e2c1a',
      '--text-secondary': '#5c4033',
      '--text-muted': '#8b7355',
      '--border': '#d4c5a9',
      '--border-accent': '#c4a882',
      '--accent': '#8b5cf6',
      '--accent-light': '#e8dcc8',
      '--overlay': 'rgba(62,44,26,0.3)'
    }
  },
  altoContraste: {
    label: 'Alto contraste',
    icon: '🔲',
    vars: {
      '--bg-page': '#ffffff',
      '--bg-editor': '#ffffff',
      '--bg-card': '#ffffff',
      '--text-primary': '#000000',
      '--text-secondary': '#000000',
      '--text-muted': '#333333',
      '--border': '#000000',
      '--border-accent': '#000000',
      '--accent': '#0000ff',
      '--accent-light': '#e0e0ff',
      '--overlay': 'rgba(0,0,0,0.5)'
    }
  }
}

const activeTheme = ref(themes.claro)

function applyTheme(name) {
  const theme = themes[name]
  if (!theme) return
  activeTheme.value = theme
  const root = document.documentElement
  Object.entries(theme.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val)
  })
  localStorage.setItem(STORAGE_KEY, name)
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && themes[saved]) {
    applyTheme(saved)
  } else {
    applyTheme('claro')
  }
}

export function useTheme() {
  return { themes, activeTheme, applyTheme, initTheme }
}
