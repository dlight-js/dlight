import { HStack } from "@dlightjs/components"
import DLight, { View, $ } from "@dlightjs/dlight"
import { div, Prop, type Typed, _ } from "@dlightjs/types"

export type OnDragFunc = (x: number, y: number) => void
export type DragAxis = "x" | "y" | "all"

class Draggable extends View {
  /** @prop */
  @Prop onDrag: Prop<OnDragFunc> = (() => {}) as any
  @Prop axis: Prop<DragAxis> = "all" as any
  @Prop minX: Prop<number> = Number.NEGATIVE_INFINITY as any
  @Prop maxX: Prop<number> = Number.POSITIVE_INFINITY as any
  @Prop minY: Prop<number> = Number.NEGATIVE_INFINITY as any
  @Prop maxY: Prop<number> = Number.POSITIVE_INFINITY as any

  axises = (() => {
    const axises: Array<"x" | "y"> = []
    if (["x", "all"].includes(this.axis)) axises.push("x")
    if (["Y", "all"].includes(this.axis)) axises.push("y")
    return axises
  })()

  /** @reactive */
  startDrag = false
  x = 0
  y = 0

  /** @member */
  draggableEl?: HTMLDivElement
  mouseX = 0
  mouseY = 0
  offsetX = 0
  offsetY = 0
  originX = 0
  originY = 0

  /** @func */
  onMouseMove = $((e: MouseEvent) => {
    if (!this.startDrag) return
    const x = e.clientX - this.mouseX + this.offsetX - this.originX
    const y = e.clientY - this.mouseY + this.offsetY - this.originY
    if (x < this.minX || x > this.maxX || y < this.minY || y > this.maxY) return
    if (this.axises.includes("x")) this.x = x
    if (this.axises.includes("y")) this.y = y
    this.onDrag(this.x, this.y)
  })

  onMouseUp = () => {
    this.startDrag = false
  }

  onMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    this.mouseX = e.clientX
    this.mouseY = e.clientY
    const draggableEl = e.currentTarget as HTMLDivElement
    const rect = draggableEl.getBoundingClientRect()
    this.offsetX = rect.left
    this.offsetY = rect.top
    this.startDrag = true
    draggableEl.focus()
  }

  /** @lifecycle */
  didMount() {
    const rect = this.draggableEl!.getBoundingClientRect()
    this.originX = rect.left
    this.originY = rect.top
    document.addEventListener("mousemove", this.onMouseMove)
    document.addEventListener("mouseup", this.onMouseUp)
  }

  willUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove)
    document.removeEventListener("mouseup", this.onMouseUp)
  }

  /** @view */
  Body() {
    HStack()
    {
      div("hhh")
        ._backgroundColor("red")
        ._flexGrow("1")
        ._height("200px")
      div()
        .element(this.draggableEl)
        .onmousedown(this.onMouseDown)
        ._width("100px")
        ._height("100px")
        ._backgroundColor("gray")
        ._transform(`translate(${this.x}px, ${this.y}px)`)
    }
  }
}

export default Draggable as any as Typed<Draggable>
