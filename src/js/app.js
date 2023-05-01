import Card from './card'
import ControllerDnD from './dnd'

const card = new Card()
card.events()
const drag = new ControllerDnD(document.querySelector('.items'))
document.addEventListener('mousedown', drag.onMouseDown)
document.addEventListener('mouseup', drag.onMouseUp)
document.addEventListener('mousemove', drag.onMouseMove)
