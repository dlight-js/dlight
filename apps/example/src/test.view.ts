import { HStack } from "@dlightjs/components"
import DLight, { View, $, type CustomNode } from "@dlightjs/dlight"
import { styled } from "@dlightjs/emotion"
import { path, required, span, svg } from "@dlightjs/types"
import { div, Prop, type Typed, _, button, SubView } from "@dlightjs/types"
import { transformWithEsbuild } from "vite"

export type OnDragFunc = (x: number, y: number) => void
export type DragAxis = "x" | "y" | "all"

class TT extends View {
  @Prop _$content

  count = 1
  @Prop hh: Prop<string> = "" as any

  didMount(_els: HTMLElement[], _node: CustomNode): void {
    this._$el = this._$el[0]
  }

  Body() {
    div(this.count)
    div(this._$content)
  }
}

const MyDiv = styled.div`
  color: red;
`

class MyIcon extends View {
  @Prop path = required
  @Prop width: Prop<number> = 24 as any
  @Prop height: Prop<number> = 24 as any
  @Prop viewBox: Prop<string> = "0 0 24 24" as any
  @Prop opacity: Prop<string> = undefined as any
  @Prop fontSize: Prop<string> = undefined as any

  Body() {
    span()
      .innerHTML(`<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}" viewBox="${this.viewBox}"><path d="${this.path}"/></svg>`)
  }
}

const CircleIcon = class extends View {
  _$forwardProps = true
  Body() {
    MyIcon()
      .path("M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z")
      .forwardProps(true)
  }
} as any as Typed<MyIcon>

class TestView extends View {
  /** @view */
  Body() {
    CircleIcon()
      .width(200)
      .height(200)
  }
}

export default TestView
