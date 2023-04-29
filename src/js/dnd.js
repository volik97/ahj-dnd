export default class DnD {
  constructor() {
    this.itemsContainer = document.querySelectorAll(".items");
    this.draggedElement = null;
    this.copyDraggedElement = null;
    this.osX = null;
    this.osY = null;
  }
  onMouseLeave(e) {
    if (!this.draggedElement) return;
    if (e.currentTarget.contains(this.draggedElement)) {
      e.currentTarget.removeChild(this.draggedElement);
    } else {
      return;
    }
  }

  onMouseUp(e) {
    if (!this.draggedElement) return;
    if (
      e.target.classList.contains("items") ||
      e.target.classList.contains("item")
    ) {
        document.body.style.cursor = '';
      this.copyDraggedElement.remove();
      this.draggedElement.classList.remove("opacity");
      this.draggedElement = null;
      this.copyDraggedElement = null;
    }
  }

  onMouseMove(e) {
    e.preventDefault();
    if (!this.draggedElement) return;
    document.body.append(this.copyDraggedElement);
    this.copyDraggedElement.style.left = `${
        e.clientX - (this.grabX - this.osX)
      }px`;
      this.copyDraggedElement.style.top = `${
        e.clientY - (this.grabY - this.osY)
      }px`;
    const closest = document.elementFromPoint(e.clientX, e.clientY);
    if (closest.parentElement.classList.contains('items')) {
        this.draggedElement.classList.add('opacity');
        if ((e.clientY - (closest.offsetTop + (closest.offsetHeight / 2))) < 0) {
          closest.parentElement.insertBefore(this.draggedElement, closest);
        } else {
          closest.parentElement.insertBefore(this.draggedElement, closest.nextSibling);
        }
    }
    if (e.target.classList.contains("items")) {
      e.target.append(this.draggedElement);
    } 
    
  }
  onMouseDown(e) {
    console.log(document.elementFromPoint(e.clientX, e.clientY));
    e.preventDefault();
    if (e.button !== 0) return;
    if (e.target.classList.contains("item")) {
      this.draggedElement = e.target;
      this.copyDraggedElement = e.target.cloneNode(true);
      this.draggedElement.classList.add("opacity");
      this.copyDraggedElement.classList.add("dragged");
      document.body.style.cursor = 'grabbing';
      this.osX = this.draggedElement.offsetLeft;
      this.osY = this.draggedElement.offsetTop;
      this.grabX = e.clientX;
      this.grabY = e.clientY;
    }
  }
  events() {
    for (const i of this.itemsContainer) {
      i.addEventListener("mousedown", (e) => this.onMouseDown(e));
      i.addEventListener("mouseleave", (e) => this.onMouseLeave(e));
    }
    document.documentElement.addEventListener("mousemove", (e) =>
      this.onMouseMove(e)
    );
    document.documentElement.addEventListener("mouseup", (e) =>
      this.onMouseUp(e)
    );
  }
}
