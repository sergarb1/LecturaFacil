<script setup>
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { exampleTexts } from '../data/example-texts.js'
import { useDB } from '../composables/useDB.js'
import { usePictogram } from '../composables/usePictogram.js'
import { useColorPerLetter } from '../composables/useColorPerLetter.js'

const editorState = inject('editorState')
const { t, locale } = useI18n()
const { refreshPictograms } = usePictogram()
const { getPresets, applyColorPerLetter, removeColorPerLetter } = useColorPerLetter()
const fonts = ['OpenDyslexic', 'Atkinson Hyperlegible', 'Lexend', 'Comic Neue', 'Arial', 'Verdana', 'Tahoma', 'Georgia', 'Times New Roman']

function execCmd(cmd, val = null) {
  document.execCommand(cmd, false, val)
  const editor = document.querySelector('.editor-content')
  if (editor) editor.focus()
}

function cargarEjemplo() {
  const lang = locale.value
  const ejemplo = exampleTexts[lang] || exampleTexts.es
  const editor = document.querySelector('.editor-content')
  if (editor) {
    editor.innerHTML = `<h2>${ejemplo.title}</h2><p>${ejemplo.text.replace(/\n/g, '<br>')}</p>`
    editorState.content = editor.innerHTML
    const db = useDB()
    db.saveContent(editor.innerHTML)
    refreshPictograms()
    if (editorState.colorPerLetter) {
      const preset = getPresets()['arcoiris']
      const colors = { ...(editorState.letterColors || preset.colors) }
      removeColorPerLetter(editor)
      applyColorPerLetter(editor, colors)
    }
  }
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex flex-wrap items-center gap-1">
    <select v-model="editorState.font"
      class="text-sm border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-lf-400">
      <option v-for="f in fonts" :key="f" :value="f">{{ f }}</option>
    </select>

    <select v-model="editorState.fontSize"
      class="text-sm border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-lf-400 w-20">
      <option v-for="s in [12,14,16,18,20,22,24,28,32,36,42,48]" :key="s" :value="s">{{ s }}px</option>
    </select>

    <span class="w-px h-6 bg-gray-200 mx-1"></span>

    <button @click="execCmd('bold')" class="p-2 rounded-lg hover:bg-gray-100 font-bold text-sm" title="Negrita">B</button>
    <button @click="execCmd('italic')" class="p-2 rounded-lg hover:bg-gray-100 italic text-sm" title="Cursiva">I</button>
    <button @click="execCmd('underline')" class="p-2 rounded-lg hover:bg-gray-100 underline text-sm" title="Subrayado">U</button>

    <span class="w-px h-6 bg-gray-200 mx-1"></span>

    <button @click="execCmd('insertUnorderedList')" class="p-2 rounded-lg hover:bg-gray-100 text-sm" title="Lista">•≡</button>
    <button @click="execCmd('insertOrderedList')" class="p-2 rounded-lg hover:bg-gray-100 text-sm" title="Lista numerada">1≡</button>

    <span class="w-px h-6 bg-gray-200 mx-1"></span>

    <button @click="execCmd('justifyLeft')" class="hidden sm:inline-flex p-2 rounded-lg hover:bg-gray-100 text-xs" title="Alinear izquierda">◁</button>
    <button @click="execCmd('justifyCenter')" class="hidden sm:inline-flex p-2 rounded-lg hover:bg-gray-100 text-xs" title="Centrar">◈</button>
    <button @click="execCmd('justifyRight')" class="hidden sm:inline-flex p-2 rounded-lg hover:bg-gray-100 text-xs" title="Alinear derecha">▷</button>

    <span class="w-px h-6 bg-gray-200 mx-1 hidden sm:inline-block"></span>

    <button @click="execCmd('formatBlock', '<p>')" class="hidden sm:inline-flex p-2 rounded-lg hover:bg-gray-100 text-xs" title="Párrafo">¶</button>
    <button @click="execCmd('formatBlock', '<h2>')" class="hidden sm:inline-flex p-2 rounded-lg hover:bg-gray-100 text-xs font-bold" title="Título">H</button>

    <span class="w-px h-6 bg-gray-200 mx-1"></span>

    <button @click="cargarEjemplo" class="px-3 py-1.5 rounded-lg bg-lf-100 text-lf-700 hover:bg-lf-200 text-xs font-medium" title="Cargar texto de ejemplo">
      📝 Ejemplo
    </button>
  </div>
</template>
