<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <div class="text-center mb-10">
      <span class="text-5xl mb-4 block">🌈</span>
      <h1 class="text-4xl font-bold text-lf-700">LecturaFacil</h1>
      <p class="text-lg text-gray-500 mt-2">{{ t('about.subtitle') }}</p>
    </div>

    <div class="bg-white rounded-2xl p-8 shadow-sm border border-lf-100 space-y-6">
      <section>
        <h2 class="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>🎯</span> Qué es LecturaFacil
        </h2>
        <p class="text-gray-600 leading-relaxed">
          LecturaFacil es un editor de texto gratuito diseñado para hacer la lectura y la escritura más accesibles
          a personas con dislexia y otras dificultades de aprendizaje. Funciona completamente en el navegador,
          sin necesidad de registro ni instalación.
        </p>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>🧩</span> Funciones principales
        </h2>
        <ul class="space-y-2 text-gray-600">
          <li class="flex items-start gap-2"><span class="text-lf-500">✦</span> Lectura en voz alta con resaltado de palabras</li>
          <li class="flex items-start gap-2"><span class="text-lf-500">✦</span> Pictogramas sobre cada palabra (ARASAAC + emojis)</li>
          <li class="flex items-start gap-2"><span class="text-lf-500">✦</span> Color por letra para distinguir caracteres</li>
          <li class="flex items-start gap-2"><span class="text-lf-500">✦</span> Línea de enfoque para mantener la atención</li>
          <li class="flex items-start gap-2"><span class="text-lf-500">✦</span> Importación de Word, PDF e imágenes (OCR)</li>
          <li class="flex items-start gap-2"><span class="text-lf-500">✦</span> Fuente OpenDyslexic para lectura cómoda</li>
          <li class="flex items-start gap-2"><span class="text-lf-500">✦</span> 9 idiomas disponibles</li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>🔒</span> Privacidad y protección de datos
        </h2>
        <div class="bg-green-50 border border-green-200 rounded-xl p-5 space-y-3 text-sm text-gray-700">
          <div class="flex items-start gap-3">
            <span class="text-green-600 text-lg mt-0.5">✅</span>
            <div>
              <span class="font-semibold text-green-800">Siempre gratuito</span>
              <p class="text-gray-600">LecturaFacil es y será siempre gratuito. Sin planes de pago, sin suscripciones, sin publicidad.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-green-600 text-lg mt-0.5">✅</span>
            <div>
              <span class="font-semibold text-green-800">Tus datos no salen de tu dispositivo</span>
              <p class="text-gray-600">Todo el procesamiento (OCR, voz, pictogramas, diccionarios) ocurre en tu navegador. No se envía ningún texto a servidores externos.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-green-600 text-lg mt-0.5">✅</span>
            <div>
              <span class="font-semibold text-green-800">Cumplimiento GDPR</span>
              <p class="text-gray-600">Al no recoger, almacenar ni transmitir datos personales, LecturaFacil cumple con el Reglamento General de Protección de Datos (GDPR) de la UE y la LOPDGDD española.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-green-600 text-lg mt-0.5">✅</span>
            <div>
              <span class="font-semibold text-green-800">Sin registro ni tracking</span>
              <p class="text-gray-600">No necesitas crear cuenta, no usamos cookies de tracking, no tenemos analytics. El código es 100% auditable en GitHub.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>💜</span> Un proyecto de
        </h2>
        <div class="bg-lf-50 rounded-xl p-6 text-center">
          <a href="https://mejoratudocencia.es" target="_blank" rel="noopener"
            class="text-2xl font-bold text-lf-700 hover:text-lf-800 underline decoration-lf-300 underline-offset-4">
            mejoratudocencia.es
          </a>
          <p class="text-gray-500 mt-2">Recursos y formación para una educación inclusiva</p>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span>📜</span> Licencia y créditos
        </h2>
        <div class="text-sm text-gray-500 space-y-3">
          <p>Este software se distribuye bajo licencia <strong>AGPL v3</strong>. Código fuente disponible en <a href="https://github.com/sergarb1/LecturaFacil" target="_blank" class="text-lf-600 hover:underline">github.com/sergarb1/LecturaFacil</a>.</p>

          <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-gray-700">
            <p class="font-semibold mb-1">Pictogramas ARASAAC</p>
            <p>Los símbolos pictográficos utilizados son propiedad del <strong>Gobierno de Aragón</strong> y han sido creados por <strong>Sergio Palao</strong> para <strong>ARASAAC</strong> (<a href="https://arasaac.org" target="_blank" class="text-lf-600 hover:underline">https://arasaac.org</a>) que los distribuye bajo licencia <strong>Creative Commons BY-NC-SA</strong>.</p>
            <p class="mt-1">Más información en <a href="https://aulaabierta.arasaac.org" target="_blank" class="text-lf-600 hover:underline">aulaabierta.arasaac.org</a>.</p>
          </div>

          <p>La fuente <strong>OpenDyslexic</strong> fue creada por Abelardo González y se distribuye bajo licencia <strong>SIL Open Font License 1.1</strong>.</p>
          <p>LecturaFacil {{ year }} &mdash; Porque leer no debería ser un obstáculo.</p>
        </div>
      </section>
    </div>
  </div>
</template>
