<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const secciones = [
  {
    icon: '✏️',
    titulo: 'Escribir y editar',
    items: [
      'Escribe directamente en el editor o pega texto copiado (Ctrl+V).',
      'Usa la barra de herramientas para poner negrita, cursiva o cambiar el tamaño de fuente.',
      'Puedes cambiar la fuente entre OpenDyslexic (recomendado) y las fuentes del sistema.',
      'Todo el texto se guarda automáticamente en tu navegador, sin conexión a internet.'
    ]
  },
  {
    icon: '📂',
    titulo: 'Importar archivos',
    items: [
      'Sube documentos Word (.docx) con el botón "Importar Word".',
      'Sube archivos PDF con el botón "Importar PDF".',
      'Sube imágenes con texto (escaneadas o fotos) usando el botón "Leer imagen" (OCR).',
      'El texto extraído se inserta en el editor listo para leer.'
    ]
  },
  {
    icon: '📖',
    titulo: 'Modo lectura',
    items: [
      'Activa "Modo lectura" en la barra para aumentar el espaciado entre líneas y palabras.',
      'Reduce la sobrecarga visual para facilitar la lectura continuada.',
      'El editor se adapta automáticamente con más espacio y letras más separadas.'
    ]
  },
  {
    icon: '🔤',
    titulo: 'Lectura guiada (palabra a palabra)',
    items: [
      'Activa "Lectura guiada" para leer palabra por palabra con resaltado.',
      'Usa las flechas ◀ ▶ o las teclas ← →, ↑ ↓, ESPACIO para navegar.',
      'Haz clic en cualquier palabra para saltar directamente a ella.',
      'Una barra de progreso muestra cuánto has avanzado.',
      'El editor se bloquea para evitar ediciones accidentales mientras lees.'
    ]
  },
  {
    icon: '🔊',
    titulo: 'Leer en voz alta',
    items: [
      'Pulsa el botón 🔊 para que el navegador lea el texto en voz alta.',
      'Cada palabra se resalta en amarillo mientras se pronuncia.',
      'Ajusta la velocidad de lectura con el deslizador 🐢—🐇 (0.5x a 2x).',
      'Pulsa ⏹️ para detener la lectura en cualquier momento.',
      'La velocidad se reinicia automáticamente al cambiarla.'
    ]
  },
  {
    icon: '🎨',
    titulo: 'Color por letra',
    items: [
      'Activa "Color por letra" para que cada letra del alfabeto tenga un color distinto.',
      'Puedes elegir entre varios esquemas predefinidos:',
      '  • Arcoíris — cada letra un color del arcoíris (por defecto)',
      '  • Vocales destacadas — vocales de un color, consonantes de otro',
      '  • Alto contraste — colores muy distintos para máxima diferenciación',
      '  • Azul suave — tonos azules sobre fondo crema para menor fatiga visual',
      '  • Verde-Violeta — alternancia de dos colores para evitar saturación',
      '  • Rojo-Azul — esquema clásico rojo/azul para problemas de visión binocular',
      'Cada persona puede elegir el esquema que mejor le funcione.'
    ]
  },
  {
    icon: '🖼️',
    titulo: 'Pictogramas',
    items: [
      'Activa "Pictogramas" para ver imágenes sobre las palabras.',
      'Cada palabra reconocida muestra un pictograma ARASAAC encima.',
      'Si no hay conexión a internet, se muestra un emoji como alternativa.',
      'El diccionario incluye más de 1.400 palabras en 15 categorías.',
      'Al desactivarlos, el texto vuelve a su estado original.'
    ]
  },
  {
    icon: '👁️',
    titulo: 'Línea de enfoque',
    items: [
      'Activa "Línea" para oscurecer todo el texto excepto la línea activa.',
      'Haz clic en cualquier renglón para mover el foco a esa línea.',
      'Reduce las distracciones y ayuda a seguir la lectura línea por línea.',
      'Funciona bien combinada con el modo lectura y la lectura guiada.'
    ]
  },
  {
    icon: '📖',
    titulo: 'Diccionario explicativo',
    items: [
      'Activa "Diccionario" y haz clic en cualquier palabra para ver su definición.',
      'El diccionario busca primero en internet (FreeDictionaryAPI).',
      'Si no hay conexión, usa un diccionario local con cientos de palabras.',
      'Disponible en los 9 idiomas: español, valenciano, catalán, euskera, gallego, inglés, francés, portugués y alemán.',
      'Ideal para aprender vocabulario nuevo mientras se lee.'
    ]
  },
  {
    icon: '🌐',
    titulo: 'Importar desde URL',
    items: [
      'Pega una URL de cualquier página web y extrae su texto legible.',
      'El sistema limpia el contenido (quita menús, anuncios, barras laterales).',
      'El texto extraído se inserta en el editor para leer con todas las herramientas.',
      'Usa un proxy CORS gratuito para poder acceder a cualquier sitio web.'
    ]
  }
]

const teclas = [
  { tecla: 'Ctrl+B', desc: 'Negrita' },
  { tecla: 'Ctrl+I', desc: 'Cursiva' },
  { tecla: 'Ctrl+U', desc: 'Subrayado' },
  { tecla: '← / →', desc: 'Palabra anterior / siguiente (lectura guiada)' },
  { tecla: 'ESPACIO', desc: 'Siguiente palabra (lectura guiada)' },
  { tecla: '↑ / ↓', desc: 'Palabra anterior / siguiente (lectura guiada)' }
]

const consejos = [
  'Usa la fuente OpenDyslexic para una lectura más cómoda si tienes dislexia.',
  'Combina el modo lectura + línea de enfoque + lectura guiada para máxima concentración.',
  'Prueba los distintos esquemas de color por letra hasta encontrar el que te resulte más cómodo.',
  'Los pictogramas ayudan mucho a primeros lectores y personas que aprenden un idioma nuevo.',
  'El diccionario explicativo funciona sin conexión con cientos de palabras predefinidas.',
  'Todos tus textos se guardan en tu navegador. No se envían a ningún servidor externo.',
  'Puedes instalar LecturaFacil como aplicación en tu móvil o PC (PWA).',
  'Las fuentes OpenDyslexic se cargan localmente, no necesitas descargar nada.'
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 space-y-8">
    <!-- Cabecera -->
    <div class="text-center mb-6">
      <span class="text-6xl mb-4 block">📖</span>
      <h1 class="text-4xl font-bold text-lf-700">{{ t('help.title') }}</h1>
      <p class="text-lg text-gray-500 mt-2">{{ t('help.subtitle') }}</p>
    </div>

    <!-- Secciones -->
    <div v-for="sec in secciones" :key="sec.titulo"
      class="bg-white rounded-2xl p-6 shadow-sm border border-lf-100 hover:shadow-md transition">
      <div class="flex items-start gap-4">
        <span class="text-3xl flex-shrink-0 mt-0.5">{{ sec.icon }}</span>
        <div class="space-y-2">
          <h2 class="text-lg font-bold text-gray-800">{{ sec.titulo }}</h2>
          <ul class="space-y-1.5">
            <li v-for="(item, i) in sec.items" :key="i"
              class="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
              <span class="text-lf-400 mt-0.5 flex-shrink-0">▸</span>
              <span v-if="item.startsWith('  •')" class="text-gray-500 ml-3">{{ item.trim() }}</span>
              <span v-else>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Atajos de teclado -->
    <div class="bg-lf-50 rounded-2xl p-6 border border-lf-200">
      <h2 class="text-xl font-bold text-lf-700 mb-4 flex items-center gap-2">
        <span>⌨️</span> Atajos de teclado
      </h2>
      <div class="grid gap-2 sm:grid-cols-2">
        <div v-for="t in teclas" :key="t.tecla"
          class="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-lf-100">
          <kbd class="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-sm font-mono font-bold border border-gray-200 shadow-sm">
            {{ t.tecla }}
          </kbd>
          <span class="text-sm text-gray-600">{{ t.desc }}</span>
        </div>
      </div>
    </div>

    <!-- Consejos -->
    <div class="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
      <h2 class="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
        <span>💡</span> Consejos útiles
      </h2>
      <ul class="space-y-2">
        <li v-for="(c, i) in consejos" :key="i" class="flex items-start gap-3 text-amber-900 text-sm">
          <span class="text-amber-500 mt-0.5 flex-shrink-0">✦</span>
          <span>{{ c }}</span>
        </li>
      </ul>
    </div>

    <!-- Contacto -->
    <div class="text-center text-gray-500 text-sm space-y-1">
      <p>¿Tienes más dudas? Visita <a href="https://mejoratudocencia.es" target="_blank" rel="noopener" class="text-lf-600 hover:underline font-medium">mejoratudocencia.es</a></p>
      <p>Únete a nuestra comunidad de Telegram para resolver dudas y compartir experiencias.</p>
    </div>
  </div>
</template>
