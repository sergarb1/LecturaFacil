<div align="center">

# ✨ LecturaFacil ✨

**Editor de texto accesible e inclusivo**  
🫱‍🫲 Para personas con dislexia, dificultades de aprendizaje, TDAH, TEA y cualquier persona que busque una experiencia de lectura y escritura más cómoda y personalizable.

<br>

## 👇 ¡Pruébalo ahora! 👇

### 🚀 [**https://sergarb1.github.io/LecturaFacil**](https://sergarb1.github.io/LecturaFacil)

**100% gratis · Sin registro · Sin servidor · Funciona sin internet**

<br>

---

</div>

## 📖 ¿Qué es LecturaFacil?

LecturaFacil es una **aplicación web progresiva (PWA)** de código abierto que funciona completamente en el navegador, sin necesidad de backend ni conexión a internet. Está diseñada desde cero para **derribar las barreras de lectura y escritura** que enfrentan personas con dislexia u otras dificultades de aprendizaje.

✅ **100% offline** — Una vez cargada, funciona sin internet.  
🔒 **Privacidad total** — Tus datos nunca salen de tu dispositivo.  
🌍 **9 idiomas** — Interfaz y diccionarios en español, catalán, valenciano, euskera, gallego, inglés, francés, portugués y alemán.  
📱 **PWA instalable** — En Android, iOS, Windows, macOS y Linux.  
💰 **Gratuito para siempre** — Sin planes de pago, sin suscripciones, sin publicidad.

---

## ✨ Características

### 🖊️ Editor de texto completo
- Formato enriquecido (negrita, cursiva, listas)
- Ajustes predefinidos para dislexia (fondo crema, fuente OpenDyslexic, interlineado 2.0)
- Temas de color: claro, oscuro, sepia, alto contraste
- Contador de palabras y estadísticas en tiempo real
- Corrector ortográfico del navegador

### 🎨 Color por letra
- 6 esquemas predefinidos: arcoíris, vocales, consonantes, pares, impares y alto contraste
- Ayuda a diferenciar cada letra, reduciendo confusiones visuales

### 🖼️ Pictogramas ARASAAC (1462 palabras)
- **100% offline**: las imágenes se sirven desde almacenamiento local
- **9 idiomas**: pictogramas con texto en todos los idiomas soportados
- 15 categorías temáticas: animales, alimentos, naturaleza, casa, cuerpo, emociones, escuela, profesiones, transporte, tecnología, ciudad, familia, adjetivos, acciones, ropa
- Fallback a emoji cuando no hay imagen disponible
- Tooltip explicativo al pasar el ratón

### 🔊 Lectura en voz alta
- Resaltado palabra por palabra (sílbido visual)
- Velocidad ajustable: 0.5× a 2×
- Cambio de velocidad con reinicio automático
- Soporta los 9 idiomas con voces nativas del sistema

### 📖 Diccionario explicativo integrado
- Definiciones sencillas y claras para 9 idiomas
- **100% offline** — no requiere APIs externas
- Fallback opcional a FreeDictionaryAPI cuando hay conexión
- Al hacer clic en una palabra, muestra su significado en un tooltip

### 👁️ Línea de enfoque
- Overlay visual que oscurece todo excepto la línea activa
- Mantiene la atención visual en la línea que se está leyendo
- Se activa/desactiva con un clic
- Ideal para personas con TDAH y dificultades de atención

### 🔤 Lectura guiada
- Modo de lectura palabra a palabra con navegación por teclado
- Velocidad ajustable para seguir el ritmo de lectura

### 📄 Importación de documentos
- **DOCX**: sube archivos de Word usando Mammoth.js
- **PDF**: extrae texto con pdfjs-dist
- **Imágenes**: OCR en el navegador con Tesseract.js (español, inglés, francés, portugués, alemán, catalán)
- **URL**: extrae texto de cualquier página web

### 🌍 Soporte multilingüe (9 idiomas)
| Idioma | Código | Pictogramas | Diccionario | Interfaz UI |
|--------|--------|:-----------:|:-----------:|:-----------:|
| Castellano | `es` | ✅ | ✅ | ✅ |
| Català | `ca` | ✅ | ✅ | ✅ |
| Valencià | `va` | ✅ | ✅ | ✅ |
| Euskera | `eu` | ✅ | ✅ | ✅ |
| Galego | `gl` | ✅ | ✅ | ✅ |
| English | `en` | ✅ | ✅ | ✅ |
| Français | `fr` | ✅ | ✅ | ✅ |
| Português | `pt` | ✅ | ✅ | ✅ |
| Deutsch | `de` | ✅ | ✅ | ✅ |

### 💾 Persistencia y PWA
- Auto-guardado al escribir (500ms debounced)
- IndexedDB con Dexie.js
- Service Worker automático con vite-plugin-pwa
- Instalable en móvil y escritorio

---

## 🚀 Primeros pasos

```bash
# Clonar el repositorio
git clone https://github.com/sergarb1/LecturaFacil.git
cd LecturaFacil

# Instalar dependencias
npm install

# Descargar fuentes OpenDyslexic
node scripts/download-libs.js

# Iniciar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la compilación
npm run preview
```

> **💡 Tip:** Abre `http://localhost:5173` en tu navegador. La app se recarga automáticamente al editar el código.

---

## 🧱 Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| [Vue 3](https://vuejs.org/) (Composition API) | ^3.5 | Framework UI — `<script setup>` + provide/inject |
| [Vite](https://vitejs.dev/) | ^6.0 | Build tool ultrarrápido |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.0 | Estilos utility-first |
| [Dexie.js](https://dexie.org/) | ^4.0 | IndexedDB para persistencia offline |
| [Tesseract.js](https://tesseract.projectnaptha.com/) | ^5.1 | OCR en navegador (wasm) |
| [Mammoth.js](https://mammoth.al) | ^1.9 | Conversor .docx → HTML |
| [pdfjs-dist](https://mozilla.github.io/pdf.js/) | ^4.0 | Extracción de texto PDF |
| [jsPDF](https://github.com/parallax/jsPDF) | ^2.5 | Generación de PDF |
| [vue-i18n](https://vue-i18n.intlify.dev/) | ^11.0 | Internacionalización (9 idiomas) |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | ^0.21 | Service Worker + Manifest PWA |
| Web Speech API | nativa del navegador | Lectura en voz alta |

---

## 🗂️ Estructura del proyecto

```
LecturaFacil/
├── index.html                     ← Entry point HTML
├── vite.config.js                 ← Configuración Vite + Tailwind + PWA
├── public/
│   ├── fonts/                     ← OpenDyslexic .woff2 (locales)
│   ├── icons/                     ← Iconos PWA (SVG)
│   ├── pictograms/                ← 51 imágenes ARASAAC locales
│   └── manifest.webmanifest       ← Manifest PWA
├── src/
│   ├── main.js                    ← Entry Vue 3 + i18n + Router
│   ├── App.vue                    ← Layout principal
│   ├── style.css                  ← Tailwind + @font-face + estilos accesibles
│   ├── data/
│   │   ├── pictogram-dictionary.js       ← Merge de 135 archivos (9 idiomas × 15 categorías)
│   │   ├── pictogram-{categoria}-{idioma}.js  ← 135 archivos individuales
│   │   ├── dictionary-{idioma}           ← 9 diccionarios offline (definiciones)
│   ├── locales/
│   │   ├── es.js, ca.js, va.js, ...      ← 9 archivos de traducción UI
│   ├── views/
│   │   ├── EditorView.vue               ← Vista principal del editor
│   │   ├── HelpView.vue                 ← Ayuda y guía de uso
│   │   └── AboutView.vue                ← Acerca de / créditos
│   ├── components/
│   │   ├── AppHeader.vue, EditorToolbar.vue, EditorArea.vue
│   │   ├── AccessibilityBar.vue, ColorPerLetterToggle.vue
│   │   ├── PictogramTooltip.vue, VoiceReader.vue
│   │   ├── DocxImporter.vue, PdfImporter.vue, OCRUploader.vue
│   └── composables/
│       ├── useEditor.js, useSpeech.js, usePictogram.js
│       ├── useColorPerLetter.js, useFocusLine.js
│       ├── useDocx.js, usePdf.js, useOCR.js
│       ├── useDB.js, useDictionary.js, usePassport.js
└── scripts/
    ├── download-libs.js           ← Descarga fuentes y librerías offline
    └── translate-pictograms.js    ← Script de traducción de pictogramas
```

---

## 🏗️ Arquitectura

### Sin servidor, sin backend

LecturaFacil es una aplicación **100% cliente**. Todo el procesamiento ocurre en el navegador:

- **OCR** → Tesseract.js (wasm en segundo plano)
- **Voz** → Web Speech API del navegador
- **Diccionario** → Archivos locales (sin API)
- **Persistencia** → IndexedDB (navegador)
- **Pictogramas** → Imágenes locales en `public/pictograms/`

### Estados globales

Los estados del editor se comparten mediante `provide/inject` desde `EditorView.vue`:

```js
const editorState = reactive({
  content: '',
  font: 'opendyslexic',
  fontSize: 22,
  lineHeight: 2.0,
  bgColor: '#fff9e6',
  colorPerLetter: false,
  pictogramMode: false,
  readerMode: false,
  isSpeaking: false,
  speechSpeed: 1,
  theme: 'light',
  focusLine: false
})
```

### Offline-first

1. **Service Worker** — Generado automáticamente por vite-plugin-pwa, cachea todos los assets
2. **Fuentes** — OpenDyslexic en `public/fonts/` 
3. **Pictogramas** — 51 imágenes descargadas localmente
4. **Diccionarios** — Definiciones completas para 9 idiomas
5. **IndexedDB** — Contenido guardado automáticamente al escribir

---

## 🛡️ Privacidad y protección de datos

| Aspecto | Detalle |
|---------|---------|
| ✅ **100% gratuito** | Sin planes de pago, sin suscripciones, sin publicidad |
| ✅ **Tus datos en tu dispositivo** | OCR, voz, diccionarios — todo en el navegador |
| ✅ **Sin conexión externa** | No se envía texto a ningún servidor |
| ✅ **GDPR / LOPDGDD** | Sin recogida de datos, sin cookies, sin tracking |
| ✅ **Sin registro** | No necesitas cuenta, email ni contraseña |
| ✅ **Código abierto** | AGPL v3 — auditable, modificable, distribuible |

---

## 📜 Licencias y atribuciones

### Código fuente
**GNU Affero General Public License v3.0** — Software Libre.  
Puedes usar, estudiar, modificar y distribuir este software bajo los términos de la AGPL v3.  
Ver [LICENSE](./LICENSE) para más detalles.

### Pictogramas ARASAAC
Los símbolos pictográficos utilizados en esta aplicación son propiedad del **Gobierno de Aragón** y han sido creados por **Sergio Palao** para [ARASAAC](https://arasaac.org) que los distribuye bajo licencia **Creative Commons BY-NC-SA**.

- Las imágenes se sirven desde `public/pictograms/` (almacenamiento local)
- Descargadas desde el repositorio oficial de ARASAAC
- No se realizan peticiones a servidores externos en runtime

### Fuente OpenDyslexic
Creada por **Abelardo González** y distribuida bajo licencia **SIL Open Font License 1.1**.

### Diccionarios
Definiciones originales de LecturaFacil — 100% locales y sin dependencia de APIs externas.

### Dependencias de terceros
Todas las librerías utilizadas (Vue, Vite, Tailwind, Dexie, Tesseract, Mammoth, pdfjs, jsPDF, vue-i18n, vite-plugin-pwa) tienen licencias de código abierto permisivas (MIT, Apache 2.0, BSD).

---

## 🤝 Contribuir

¿Quieres ayudar a mejorar LecturaFacil? ¡Toda contribución es bienvenida!

- 🐛 **Reporta errores** — Abre un issue en GitHub
- 💡 **Sugiere mejoras** — Ideas para nuevas funciones o mejoras de accesibilidad
- 🌐 **Traducciones** — Ayuda a mejorar los 9 idiomas o añadir nuevos
- 🖼️ **Pictogramas** — Añade más palabras y categorías

Antes de contribuir, consulta nuestra [Guía de contribución](CONTRIBUTING.md) (pendiente).

---

## 🧪 Estado del proyecto

✅ **MVP completo** — Editor, pictogramas, voz, diccionario, OCR, DOCX, PDF, PWA, 9 idiomas  
🔧 **En desarrollo activo** — Mejoras continuas de accesibilidad y rendimiento

---

<div align="center">

Hecho con ❤️ para hacer la lectura más fácil para todos.

**LecturaFacil** — *Leer no debería ser una barrera.*

</div>
