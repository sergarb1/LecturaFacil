import { ref } from 'vue'
import Dexie from 'dexie'

const docs = ref([])
const activeDocId = ref(null)
const loading = ref(false)

let db = null

function getDB() {
  if (!db) {
    db = new Dexie('LecturaFacilDocs')
    db.version(1).stores({
      documents: '++id, title, updatedAt'
    })
  }
  return db
}

export function useDocuments() {
  async function loadDocs() {
    loading.value = true
    try {
      const d = getDB()
      const all = await d.documents.orderBy('updatedAt').reverse().toArray()
      docs.value = all
    } catch (e) {
      console.warn('Error loading docs:', e)
    } finally {
      loading.value = false
    }
  }

  async function createDoc(title) {
    const d = getDB()
    const now = new Date().toISOString()
    const id = await d.documents.put({
      title: title || 'Sin título',
      html: '',
      updatedAt: now,
      createdAt: now
    })
    const doc = await d.documents.get(id)
    docs.value.unshift(doc)
    activeDocId.value = id
    return doc
  }

  async function saveDoc(id, html) {
    if (!id) return
    const d = getDB()
    const now = new Date().toISOString()
    await d.documents.update(id, { html, updatedAt: now })
    const idx = docs.value.findIndex(doc => doc.id === id)
    if (idx !== -1) {
      docs.value[idx].html = html
      docs.value[idx].updatedAt = now
    }
  }

  async function deleteDoc(id) {
    const d = getDB()
    await d.documents.delete(id)
    docs.value = docs.value.filter(doc => doc.id !== id)
    if (activeDocId.value === id) {
      activeDocId.value = docs.value[0]?.id || null
    }
  }

  async function selectDoc(id) {
    activeDocId.value = id
  }

  function getActiveDoc() {
    return docs.value.find(d => d.id === activeDocId.value) || null
  }

  return {
    docs,
    activeDocId,
    loading,
    loadDocs,
    createDoc,
    saveDoc,
    deleteDoc,
    selectDoc,
    getActiveDoc
  }
}
