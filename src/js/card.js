/* eslint-disable class-methods-use-this */
// /* eslint-disable no-console */

export default class Card {
  constructor () {
    this.textAreaViewBtn = Array.from(
      document.getElementsByClassName('add-another-card')
    )
    this.textArea = Array.from(document.getElementsByTagName('textarea'))
    this.cards = []
  }

  showTextArea (target) {
    target.classList.add('hidden')
    const targetTextArea = this.textAreaViewBtn.filter(
      (textArea) => textArea.parentElement === target.parentElement
    )[0]
    targetTextArea.classList.remove('hidden')
  }

  closeTextArea (e) {
    e.target.parentElement.parentElement.classList.add('hidden')
    e.target.parentElement.parentElement.previousSibling.previousSibling.classList.remove(
      'hidden'
    )
  }

  newCard (text) {
    const card = document.createElement('div')
    const id = +new Date()
    card.textContent = text
    card.setAttribute('id', id)
    card.classList.add('item')
    const close = document.createElement('span')

    close.classList.add('deleted-btn')
    card.appendChild(close)
    return card
  }

  clearTextArea (e) {
    e.target.parentElement.parentElement.children[0].value = ''
  }

  UseButtonTextarea (e) {
    if (e.target.classList.contains('add')) {
      const text = e.target.parentElement.parentElement.children[0].value
      if (text) {
        const items = e.target.closest('.add-another-card').previousElementSibling
          .previousElementSibling
        const card = this.newCard(text)
        const obj = {}
        obj[card.id] = card
        this.cards.push(obj)
        items.appendChild(card)
        this.closeTextArea(e)
        this.clearTextArea(e)
      } else {
        this.closeTextArea(e)
      }
    }
    if (e.target.classList.contains('cancel')) {
      this.closeTextArea(e)
      this.clearTextArea(e)
    }
  }

  clickOnAddAnotherCardBtn (e) {
    if (e.target.classList.contains('btn-add-another-card')) {
      this.showTextArea(e.target)
    }
  }

  deletedCard (e) {
    if (e.target.classList.contains('deleted-btn')) {
      e.target.closest('div').remove()
      const cardToDeleted = e.target.closest('div').id
      this.cards = this.cards.filter((card) => Object.keys(card)[0] !== cardToDeleted)
    }
  }

  events () {
    document.addEventListener('click', (e) => this.clickOnAddAnotherCardBtn(e))
    document.addEventListener('click', (e) => this.UseButtonTextarea(e))
    document.addEventListener('click', (e) => this.deletedCard(e))
  }
}
