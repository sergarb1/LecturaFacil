import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock de SpeechSynthesis
const mockUtterance = {
  rate: 1,
  pitch: 1,
  volume: 1,
  lang: 'es',
  voice: null,
  onboundary: null,
  onend: null,
  onerror: null,
  text: ''
}

const mockSpeechSynthesis = {
  cancel: vi.fn(),
  speak: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  getVoices: vi.fn(() => [
    { lang: 'es-ES', name: 'Spanish (Spain)' },
    { lang: 'en-US', name: 'English (US)' }
  ])
}

vi.stubGlobal('speechSynthesis', mockSpeechSynthesis)
const MockSpeechSynthesisUtterance = function (text) {
  mockUtterance.text = text
  return mockUtterance
}
vi.stubGlobal('SpeechSynthesisUtterance', MockSpeechSynthesisUtterance)

const { useSpeech } = await import('../../src/composables/useSpeech.js')

describe('useSpeech', () => {
  let speech

  beforeEach(() => {
    vi.clearAllMocks()
    document.body.innerHTML = ''
    speech = useSpeech()
  })

  it('isSpeaking empieza en false', () => {
    expect(speech.isSpeaking.value).toBe(false)
  })

  it('isPaused empieza en false', () => {
    expect(speech.isPaused.value).toBe(false)
  })

  it('speed empieza en 1', () => {
    expect(speech.speed.value).toBe(1)
  })

  it('speak llama a speechSynthesis.speak', () => {
    speech.speak('Hola mundo')
    expect(mockSpeechSynthesis.cancel).toHaveBeenCalled()
    expect(mockSpeechSynthesis.speak).toHaveBeenCalled()
    expect(speech.isSpeaking.value).toBe(true)
  })

  it('speak no hace nada con texto vacío', () => {
    speech.speak('')
    expect(mockSpeechSynthesis.speak).not.toHaveBeenCalled()
  })

  it('speak selecciona voz según el idioma', () => {
    speech.speak('Hello world', 1, 'en')
    expect(mockUtterance.lang).toBe('en')
    expect(speech.isSpeaking.value).toBe(true)
  })

  it('stop llama a speechSynthesis.cancel', () => {
    speech.speak('Texto')
    speech.stop()
    expect(mockSpeechSynthesis.cancel).toHaveBeenCalledTimes(2)
    expect(speech.isSpeaking.value).toBe(false)
    expect(speech.isPaused.value).toBe(false)
  })

  it('pause llama a speechSynthesis.pause si está hablando', () => {
    speech.speak('Texto')
    speech.pause()
    expect(mockSpeechSynthesis.pause).toHaveBeenCalled()
    expect(speech.isPaused.value).toBe(true)
  })

  it('pause no hace nada si no está hablando', () => {
    speech.pause()
    expect(mockSpeechSynthesis.pause).not.toHaveBeenCalled()
  })

  it('resume llama a speechSynthesis.resume si está pausado', () => {
    speech.speak('Texto')
    speech.pause()
    speech.resume()
    expect(mockSpeechSynthesis.resume).toHaveBeenCalled()
    expect(speech.isPaused.value).toBe(false)
  })

  it('resume no hace nada si no está pausado', () => {
    speech.resume()
    expect(mockSpeechSynthesis.resume).not.toHaveBeenCalled()
  })

  it('setSpeed cambia speed.value', () => {
    speech.setSpeed(1.5)
    expect(speech.speed.value).toBe(1.5)
  })

  it('utterance usa la tasa especificada', () => {
    speech.speak('Test', 1.5, 'es')
    expect(mockUtterance.rate).toBe(1.5)
  })
})
