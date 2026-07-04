# LecturaFacil — Guía para Agentes de IA

## Proyecto

Aplicación web PWA, editor de texto inclusivo para personas con dislexia.
Construida con Vue 3 (Composition API) + Tailwind CSS + Vite. 100% cliente, sin backend.
Licencia: **AGPL v3**.

## Estructura

```
LecturaFacil/
├── index.html                  ← Entry point HTML
├── vite.config.js              ← Vite + Tailwind + PWA plugin
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── AGENTS.md                   ← Este archivo
├── README.md
├── LICENSE                     ← AGPL v3
├── lib/                       ← Copias locales de librerías para fallback offline
├── scripts/
│   └── download-libs.js       ← Script para descargar fuentes y librerías offline
├── public/
│   ├── fonts/                  ← OpenDyslexic .woff2
│   ├── icons/                  ← SVG icons para PWA
│   └── manifest.webmanifest    ← PWA manifest
├── src/
│   ├── main.js                 ← Entry Vue 3 + i18n (9 idiomas) + Router
│   ├── App.vue                 ← Layout principal
│   ├── style.css               ← Tailwind + @font-face + .lecto-highlight + .pictogram-inline + .focus-line
│   ├── data/
│   │   ├── pictogram-dictionary.js   ← Merge de 15 archivos temáticos (1462 palabras)
│   │   ├── pictogram-animales.js     ← 133
│   │   ├── pictogram-alimentos.js    ← 134
│   │   ├── pictogram-naturaleza.js   ← 136
│   │   ├── pictogram-casa.js         ← 130
│   │   ├── pictogram-ropa.js         ← 40
│   │   ├── pictogram-cuerpo.js       ← 63
│   │   ├── pictogram-emociones.js    ← 43
│   │   ├── pictogram-acciones.js     ← 205
│   │   ├── pictogram-escuela.js      ← 124
│   │   ├── pictogram-profesiones.js  ← 48
│   │   ├── pictogram-transporte.js   ← 53
│   │   ├── pictogram-tecnologia.js   ← 32
│   │   ├── pictogram-ciudad.js       ← 94
│   │   ├── pictogram-familia.js      ← 64
│   │   └── pictogram-adjetivos.js    ← 163
│   ├── locales/
│   │   ├── es.js               ← Castellano
│   │   ├── va.js               ← Valencià
│   │   ├── ca.js               ← Català
│   │   ├── eu.js               ← Euskera
│   │   ├── gl.js               ← Galego
│   │   ├── en.js               ← English
│   │   ├── fr.js               ← Français
│   │   ├── pt.js               ← Português
│   │   └── de.js               ← Deutsch
│   ├── views/
│   │   ├── EditorView.vue      ← Vista principal del editor
│   │   └── PassportView.vue    ← Vista del pasaporte digital
│   ├── components/
│   │   ├── AppHeader.vue       ← Cabecera con nav e idiomas (9)
│   │   ├── EditorToolbar.vue   ← Barra de formato (negrita, cursiva, etc.)
│   │   ├── EditorArea.vue      ← Área ContentEditable + FocusLine click
│   │   ├── AccessibilityBar.vue ← Barra accesibilidad (lectura, pictos, color, línea enfoque)
│   │   ├── ColorPerLetterToggle.vue ← Control color por letra
│   │   ├── PictogramTooltip.vue ← Tooltip pictograma al hover
│   │   ├── VoiceReader.vue     ← Panel lectura en voz alta
│   │   ├── DocxImporter.vue    ← Subir .docx
│   │   ├── PdfImporter.vue     ← Subir .pdf
│   │   ├── OCRUploader.vue     ← Subir imagen para OCR
│   │   └── PassportForm.vue    ← Formulario pasaporte digital
│   ├── composables/
│   │   ├── useEditor.js        ← Estado editor + persistencia
│   │   ├── useSpeech.js        ← Web Speech API + resaltado palabra + restart al cambiar velocidad
│   │   ├── usePictogram.js     ← Diccionario 1462 palabras + downloadPublicDictionary + mark/unmark DOM
│   │   ├── useColorPerLetter.js ← Colorear cada letra (toggle on/off con restore)
│   │   ├── useFocusLine.js     ← Línea de enfoque (overlay oscurece todo menos línea activa)
│   │   ├── useDocx.js          ← Importar DOCX con Mammoth
│   │   ├── usePdf.js           ← Importar PDF con pdfjs-dist
│   │   ├── useOCR.js           ← OCR con Tesseract.js
│   │   ├── useDB.js            ← IndexedDB con Dexie
│   │   └── usePassport.js      ← Generar PDF con jsPDF
│   └── stores/                 ← (reservado para Pinia)
```

## Convenciones de código

- **Comentarios en español** (obligatorio)
- **Vue 3 Composition API** con `<script setup>` (sin Options API)
- **Sin TypeScript** — JavaScript plano
- **Nombres**: camelCase, PascalCase, MAYUSCULAS
- **Tailwind utility-first**
- **ContentEditable**: ref + innerHTML manual (sin v-html)
- **Sin backend**: todo en navegador (OCR, DOCX, PDF, voz)
- **Offline-first**: PWA, IndexedDB, fuentes locales

## Arquitectura

### Estados globales
- `editorState` via `provide/inject` desde `EditorView.vue`
- Contiene: content, font, fontSize, colorPerLetter, letterColors, pictogramMode, readerMode, isSpeaking, speechSpeed

### Comunicación entre componentes
- `provide('editorState', editorState)` + `inject('editorState')`
- Eventos: `@import`, `@ocr`, `@pdf` hacia EditorArea
- `usePictogram`, `useSpeech`, `useColorPerLetter`, `useFocusLine` modifican DOM directamente

### Persistencia
- IndexedDB via Dexie: content, passport, dictionary
- Auto-guardado al escribir (500ms debounced via onInput)

### Pictogramas (1462 palabras)
- 15 archivos temáticos en `src/data/`, mergeados en `pictogram-dictionary.js`
- Imagen ARASAAC + emoji fallback (image vacía usa emoji)
- Al activar: busca palabras en text nodes con regex, envuelve en `<span class="pictogram-inline">` con imagen encima
- Tooltip al hover via `PictogramTooltip.vue`
- `downloadPublicDictionary(lang, url)` para descargar diccionarios externos

### Lectura en voz alta
- SpeechSynthesis API
- Resaltado palabra con `.lecto-highlight` (fondo amarillo)
- Velocidad 0.5x-2x, restart automático al cambiar velocidad

### Línea de enfoque
- `useFocusLine.js`: overlay con dos divs semitransparentes (arriba/abajo) + indicador azul
- Se activa/desactiva desde `AccessibilityBar.vue`
- Se posiciona al hacer clic en el editor

### Color por letra
- 26 colores (alfabeto)
- `removeColorPerLetter()` restaura texto original al desactivar

## Idiomas soportados (9)
- `es` Castellano (default), `va` Valencià, `ca` Català, `eu` Euskera, `gl` Galego
- `en` English, `fr` Français, `pt` Português, `de` Deutsch

## Notas importantes
- OpenDyslexic en `public/fonts/` (ejecutar `node scripts/download-libs.js`)
- Diccionario pictogramas usa ARASAAC (internet) + emoji fallback
- Tesseract.js descarga ~5MB wasm en background
- Service worker automático (vite-plugin-pwa)
- Locale guardado en localStorage: `lf-idioma`
- **Problema conocido**: contenteditable + Vue requiere ref directa (sin v-html)
- `npm run dev` | `npm run build && npm run preview`
- `node scripts/download-libs.js`


<!-- headroom:rtk-instructions -->
# RTK (Rust Token Killer) - Token-Optimized Commands

When running shell commands, **always prefix with `rtk`**. This reduces context
usage by 60-90% with zero behavior change. If rtk has no filter for a command,
it passes through unchanged — so it is always safe to use.

## Key Commands
```bash
# Git (59-80% savings)
rtk git status          rtk git diff            rtk git log

# Files & Search (60-75% savings)
rtk ls <path>           rtk read <file>         rtk grep <pattern>
rtk find <pattern>      rtk diff <file>

# Test (90-99% savings) — shows failures only
rtk pytest tests/       rtk cargo test          rtk test <cmd>

# Build & Lint (80-90% savings) — shows errors only
rtk tsc                 rtk lint                rtk cargo build
rtk prettier --check    rtk mypy                rtk ruff check

# Analysis (70-90% savings)
rtk err <cmd>           rtk log <file>          rtk json <file>
rtk summary <cmd>       rtk deps                rtk env

# GitHub (26-87% savings)
rtk gh pr view <n>      rtk gh run list         rtk gh issue list

# Infrastructure (85% savings)
rtk docker ps           rtk kubectl get         rtk docker logs <c>

# Package managers (70-90% savings)
rtk pip list            rtk pnpm install        rtk npm run <script>
```

## Rules
- In command chains, prefix each segment: `rtk git add . && rtk git commit -m "msg"`
- For debugging, use raw command without rtk prefix
- `rtk proxy <cmd>` runs command without filtering but tracks usage
<!-- /headroom:rtk-instructions -->

<!-- CODEGRAPH_START -->
## CodeGraph

In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), reach for it BEFORE grep/find or reading files when you need to understand or locate code:

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them, including dynamic-dispatch hops grep can't follow. Name a file or symbol in the query to read its current line-numbered source. If it's listed but deferred, load it by name via tool search.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.

If there is no `.codegraph/` directory, skip CodeGraph entirely — indexing is the user's decision.
<!-- CODEGRAPH_END -->
