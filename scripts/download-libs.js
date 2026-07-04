/**
 * download-libs.js - Descarga librerías para fallback offline
 *
 * Uso: node scripts/download-libs.js
 *
 * Descarga copias locales de las librerías principales en /lib/
 * para que la app funcione offline sin depender de CDNs.
 */

import https from 'node:https'
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const LIB_DIR = path.join(__dirname, '..', 'lib')
const FONTS_DIR = path.join(__dirname, '..', 'public', 'fonts')

const LIBRERIAS = [
  {
    nombre: 'Tesseract.js worker',
    url: 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/worker.min.js',
    archivo: 'tesseract-worker.min.js'
  },
  {
    nombre: 'Mammoth.js',
    url: 'https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js',
    archivo: 'mammoth.browser.min.js'
  },
  {
    nombre: 'jsPDF',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    archivo: 'jspdf.umd.min.js'
  }
]

const FUENTES = [
  {
    nombre: 'OpenDyslexic Regular',
    url: 'https://cdn.jsdelivr.net/fontsource/fonts/opendyslexic@latest/latin-400-normal.woff2',
    archivo: 'OpenDyslexic-Regular.woff2'
  },
  {
    nombre: 'OpenDyslexic Bold',
    url: 'https://cdn.jsdelivr.net/fontsource/fonts/opendyslexic@latest/latin-700-normal.woff2',
    archivo: 'OpenDyslexic-Bold.woff2'
  },
  {
    nombre: 'OpenDyslexic Italic',
    url: 'https://cdn.jsdelivr.net/fontsource/fonts/opendyslexic@latest/latin-400-italic.woff2',
    archivo: 'OpenDyslexic-Italic.woff2'
  }
]

function descargar(url, destino) {
  return new Promise((resolve, reject) => {
    const archivo = fs.createWriteStream(destino)
    const protocolo = url.startsWith('https') ? https : http

    protocolo.get(url, (respuesta) => {
      if (respuesta.statusCode >= 300 && respuesta.statusCode < 400 && respuesta.headers.location) {
        // Redirección
        archivo.close()
        descargar(respuesta.headers.location, destino).then(resolve).catch(reject)
        return
      }

      if (respuesta.statusCode !== 200) {
        archivo.close()
        fs.unlink(destino, () => {})
        reject(new Error(`HTTP ${respuesta.statusCode} para ${url}`))
        return
      }

      respuesta.pipe(archivo)

      archivo.on('finish', () => {
        archivo.close()
        resolve()
      })
    }).on('error', (err) => {
      archivo.close()
      fs.unlink(destino, () => {})
      reject(err)
    })
  })
}

async function main() {
  console.log('=== Descargando librerías para fallback offline ===\n')

  // Crear directorios si no existen
  ;[LIB_DIR, FONTS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      console.log(`Creado directorio: ${dir}`)
    }
  })

  // Descargar librerías
  for (const lib of LIBRERIAS) {
    const destino = path.join(LIB_DIR, lib.archivo)
    if (fs.existsSync(destino)) {
      console.log(`✓ ${lib.nombre} ya existe, saltando...`)
      continue
    }
    try {
      process.stdout.write(`Descargando ${lib.nombre}... `)
      await descargar(lib.url, destino)
      console.log('✓ OK')
    } catch (err) {
      console.log(`✗ Error: ${err.message}`)
    }
  }

  console.log('')

  // Descargar fuentes
  for (const fuente of FUENTES) {
    const destino = path.join(FONTS_DIR, fuente.archivo)
    if (fs.existsSync(destino)) {
      console.log(`✓ ${fuente.nombre} ya existe, saltando...`)
      continue
    }
    try {
      process.stdout.write(`Descargando ${fuente.nombre}... `)
      await descargar(fuente.url, destino)
      console.log('✓ OK')
    } catch (err) {
      console.log(`✗ Error: ${err.message}`)
    }
  }

  console.log('\n=== Descarga completada ===')
}

main().catch(console.error)
