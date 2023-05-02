import Card from './card'
import ControllerDnD from './dnd'
import AppMemory from './memory'
const card = new Card()
card.events()
const mem = new AppMemory()
mem.events()
const drag = new ControllerDnD(document.querySelector('.items'))
drag.events()
