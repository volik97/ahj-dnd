export default class AppMemory {
  constructor () {
    this.storage = localStorage
    this.columns = { todo: [], progress: [], done: [] }
    this.columnsName = Object.keys(this.columns)
  }

  createCard (text) {
    const card = document.createElement('div')
    card.textContent = text
    card.classList.add('item')
    const close = document.createElement('span')
    close.classList.add('deleted-btn')
    card.appendChild(close)
    return card
  }

  saveInLS () {
    for (const name of this.columnsName) {
      this.getAndSaveText(name)
    }
    this.storage.setItem('cards', JSON.stringify(this.columns))
  }

  getInLS () {
    return JSON.parse(this.storage.getItem('cards'))
  }

  renderDOM (getInLS) {
    const items = getInLS
    for (const name of this.columnsName) {
      for (const text of items[name]) {
        document.querySelector(`.${name}`).children[1].appendChild(this.createCard(text))
      }
    }
    this.storage.removeItem('cards')
  }

  getAndSaveText (column) {
    const targetColumn = Array.from(
      document.querySelector(`.${column}`).children[1].children
    )
    if (!targetColumn[0]) {
      return
    }
    if (targetColumn[0]) {
      const text = []
      for (const i of targetColumn) {
        text.push(i.textContent)
      }
      for (const i in this.columns) {
        if (column === i) {
          for (const t of text) {
            this.columns[i].push(t)
          }
        }
      }
    }
  }

  events () {
    window.addEventListener('unload', () => this.saveInLS())
    window.addEventListener('DOMContentLoaded', this.renderDOM(this.getInLS()))
  }
}
