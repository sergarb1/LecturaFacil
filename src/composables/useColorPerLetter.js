const PRESETS = {
  arcoiris: {
    label: 'Arcoíris',
    desc: 'Cada letra un color distinto',
    colors: {
      a: '#e74c3c', b: '#3498db', c: '#2ecc71', d: '#f39c12',
      e: '#9b59b6', f: '#1abc9c', g: '#e67e22', h: '#2980b9',
      i: '#27ae60', j: '#d35400', k: '#c0392b', l: '#16a085',
      m: '#8e44ad', n: '#2c3e50', o: '#d35400', p: '#7f8c8d',
      q: '#f1c40f', r: '#e74c3c', s: '#3498db', t: '#2ecc71',
      u: '#9b59b6', v: '#1abc9c', w: '#e67e22', x: '#2980b9',
      y: '#27ae60', z: '#c0392b'
    }
  },
  vocales: {
    label: 'Vocales destacadas',
    desc: 'Vocales rojas, consonantes azules',
    colors: {
      a: '#d32f2f', b: '#1565c0', c: '#1565c0', d: '#1565c0',
      e: '#d32f2f', f: '#1565c0', g: '#1565c0', h: '#1565c0',
      i: '#d32f2f', j: '#1565c0', k: '#1565c0', l: '#1565c0',
      m: '#1565c0', n: '#1565c0', o: '#d32f2f', p: '#1565c0',
      q: '#1565c0', r: '#1565c0', s: '#1565c0', t: '#1565c0',
      u: '#d32f2f', v: '#1565c0', w: '#1565c0', x: '#1565c0',
      y: '#1565c0', z: '#1565c0'
    }
  },
  altoContraste: {
    label: 'Alto contraste',
    desc: 'Máxima diferenciación entre letras',
    colors: {
      a: '#d32f2f', b: '#1976d2', c: '#388e3c', d: '#f57c00',
      e: '#7b1fa2', f: '#00796b', g: '#e65100', h: '#1565c0',
      i: '#2e7d32', j: '#c62828', k: '#4527a0', l: '#00838f',
      m: '#4e342e', n: '#37474f', o: '#ef6c00', p: '#546e7a',
      q: '#f9a825', r: '#d32f2f', s: '#1976d2', t: '#388e3c',
      u: '#7b1fa2', v: '#00796b', w: '#e65100', x: '#1565c0',
      y: '#2e7d32', z: '#c62828'
    }
  },
  azulSuave: {
    label: 'Azul suave',
    desc: 'Tonos azules, menor fatiga visual',
    colors: {
      a: '#42a5f5', b: '#1e88e5', c: '#1565c0', d: '#0d47a1',
      e: '#64b5f6', f: '#90caf9', g: '#29b6f6', h: '#0288d1',
      i: '#0277bd', j: '#01579b', k: '#4fc3f7', l: '#2196f3',
      m: '#1976d2', n: '#0d47a1', o: '#81d4fa', p: '#4fc3f7',
      q: '#29b6f6', r: '#42a5f5', s: '#1e88e5', t: '#1565c0',
      u: '#64b5f6', v: '#90caf9', w: '#0288d1', x: '#0277bd',
      y: '#01579b', z: '#2196f3'
    }
  },
  verdeVioleta: {
    label: 'Verde-Violeta',
    desc: 'Alternancia verde/violeta, dos colores',
    colors: {
      a: '#7b1fa2', b: '#2e7d32', c: '#7b1fa2', d: '#2e7d32',
      e: '#7b1fa2', f: '#2e7d32', g: '#7b1fa2', h: '#2e7d32',
      i: '#7b1fa2', j: '#2e7d32', k: '#7b1fa2', l: '#2e7d32',
      m: '#7b1fa2', n: '#2e7d32', o: '#7b1fa2', p: '#2e7d32',
      q: '#7b1fa2', r: '#2e7d32', s: '#7b1fa2', t: '#2e7d32',
      u: '#7b1fa2', v: '#2e7d32', w: '#7b1fa2', x: '#2e7d32',
      y: '#7b1fa2', z: '#2e7d32'
    }
  },
  rojoAzul: {
    label: 'Rojo-Azul',
    desc: 'Clásico rojo/azul para visión binocular',
    colors: {
      a: '#d32f2f', b: '#1565c0', c: '#d32f2f', d: '#1565c0',
      e: '#d32f2f', f: '#1565c0', g: '#d32f2f', h: '#1565c0',
      i: '#d32f2f', j: '#1565c0', k: '#d32f2f', l: '#1565c0',
      m: '#d32f2f', n: '#1565c0', o: '#d32f2f', p: '#1565c0',
      q: '#d32f2f', r: '#1565c0', s: '#d32f2f', t: '#1565c0',
      u: '#d32f2f', v: '#1565c0', w: '#d32f2f', x: '#1565c0',
      y: '#d32f2f', z: '#1565c0'
    }
  }
}

export function useColorPerLetter() {
  function getPresets() {
    return PRESETS
  }

  function getPreset(name) {
    return PRESETS[name] || PRESETS.arcoiris
  }

  function applyColorPerLetter(editor, colorMap) {
    if (!editor) return
    const colors = colorMap || PRESETS.arcoiris.colors
    const treeWalker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT)
    const textNodes = []
    while (treeWalker.nextNode()) {
      let parent = treeWalker.currentNode.parentNode
      let skip = false
      while (parent && parent !== editor) {
        if (parent.dataset?.pictogram === 'true' ||
            parent.classList?.contains('lf-highlight') ||
            parent.style?.color) { skip = true; break }
        parent = parent.parentNode
      }
      if (!skip) textNodes.push(treeWalker.currentNode)
    }

    textNodes.forEach(node => {
      const text = node.textContent
      const fragment = document.createDocumentFragment()
      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        const lower = char.toLowerCase()
        const color = colors[lower]
        if (color && /[a-zA-Z]/.test(char)) {
          const span = document.createElement('span')
          span.style.color = color
          span.textContent = char
          fragment.appendChild(span)
        } else {
          fragment.appendChild(document.createTextNode(char))
        }
      }
      node.parentNode.replaceChild(fragment, node)
    })
  }

  function removeColorPerLetter(editor) {
    if (!editor) return
    editor.querySelectorAll('span[style*="color"]').forEach(span => {
      if (span.childNodes.length === 1 && span.childNodes[0].nodeType === Node.TEXT_NODE) {
        const parent = span.parentNode
        parent.replaceChild(document.createTextNode(span.textContent), span)
        parent.normalize()
      }
    })
  }

  return { getPresets, getPreset, applyColorPerLetter, removeColorPerLetter }
}
