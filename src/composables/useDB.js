import Dexie from 'dexie'

let db = null

function getDB() {
  if (!db) {
    db = new Dexie('LecturaFacil')
    db.version(1).stores({
      content: 'id, html, updatedAt',
      dictionary: 'id, lang, words'
    })
  }
  return db
}

export function useDB() {
  function init() {
    // Just reference to create the database
    getDB()
  }

  async function saveContent(html) {
    const d = getDB()
    await d.content.put({
      id: 'editor-content',
      html,
      updatedAt: new Date().toISOString()
    })
  }

  async function loadContent() {
    const d = getDB()
    const item = await d.content.get('editor-content')
    return item ? item.html : null
  }

  return { init, saveContent, loadContent }
}
