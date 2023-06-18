import { HStack } from "@dlightjs/components"
import DLight, { View, $, type CustomNode } from "@dlightjs/dlight"
import { styled } from "@dlightjs/emotion"
import { path, required, span, svg } from "@dlightjs/types"
import { div, Prop, type Typed, _, button, SubView } from "@dlightjs/types"
import { transformWithEsbuild } from "vite"
import { Icon10kFilled } from "@dlightjs/material-icons"

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


class TestView extends View {
  /** @view */
  Body() {
    Icon10kFilled()
      .width(200)
      .height(200)
  }
}

export default TestView
