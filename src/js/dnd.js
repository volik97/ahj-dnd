class CardDnD {
  #el
  #styles

  constructor (element) {
    this.#el = element
    this.#styles = window.getComputedStyle(element)
  }

  clear () {
    this.#el.remove()
  }

  set styles (text) {
    this.#el.style.cssText = text
  }

  get styles () {
    return this.#styles
  }

  get avatar () {
    return (() => {
      const avatar = document.createElement('div')
      avatar.classList.add('opacity')
      const { width, height } = this.styles
      avatar.style.cssText = `
            width:${width};
            height:${height};
            margin: 10px 0;
            `
      return avatar
    })()
  }

  get element () {
    return this.#el
  }
}

// eslint-disable-next-line no-unused-vars
export default class ControllerDnD {
  constructor (container) {
    this.container = container
    this.draggingElement = null
    this.draggingAvatar = null
  }

  clear () {
    this.draggingAvatar = null
    this.draggingElement = null
  }

  setDraggingElement (node) {
    this.draggingElement = new CardDnD(node)
  }

  replaceDragging () {
    this.draggingAvatar.replaceWith(this.draggingElement.element)
    this.draggingElement.element.style = this.draggingElement.styles
  }

  onMouseDown = (e) => {
    if (e.button !== 0) return
    const target = e.target
    if (target.classList.contains('item')) {
      this.shiftX = e.offsetX
      this.shiftY = e.offsetY
      this.setDraggingElement(target)
      document.body.style.cursor = 'grabbing'
      this.draggingElement.style = `
        left: ${e.pageX - this.shiftX}px;
        top: ${e.pageY - this.shiftY}px
        `
      this.avatarEvent(e)
    }
  }

  onMouseUp = (e) => {
    e.preventDefault()
    if (this.draggingElement) {
      this.replaceDragging()
      this.clear()
    }
  }

  avatarEvent (e) {
    const target = e.target
    const element = this.draggingElement
    const avatar = this.draggingAvatar
    if (!target.children[0] && target.classList.contains('items')) {
      target.appendChild(avatar)
    }
    if (
      target.classList.contains('item') &&
      !target.classList.contains('opacity')
    ) {
      const { y, height } = target.getBoundingClientRect()
      const appendPosition =
        y + height / 2 > e.clientY ? 'beforebegin' : 'afterend'

      if (!avatar) {
        this.draggingAvatar = element.avatar
      } else {
        avatar.remove()
        target.insertAdjacentElement(appendPosition, avatar)
      }
    }
  }

  onMouseMove = (e) => {
    e.preventDefault()
    if (this.draggingElement) {
      const { pageX, pageY } = e
      const element = this.draggingElement
      const { width, height } = this.draggingElement.styles
      element.styles = `
        position: absolute;
         left: ${pageX - this.shiftX}px;
         top: ${pageY - this.shiftY}px;
         pointer-events: none;
        width: ${width};
        height: ${height};
    `
      this.avatarEvent(e)
    }
  }

  events () {
    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mousemove', this.onMouseMove)
  }
}
