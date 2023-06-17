import { HStack } from "@dlightjs/components"
import DLight, { View, $ } from "@dlightjs/dlight"
import { div, Prop, type Typed, _, button, SubView } from "@dlightjs/types"
import { transformWithEsbuild } from "vite"

export type OnDragFunc = (x: number, y: number) => void
export type DragAxis = "x" | "y" | "all"

// class TT extends View {
//   count = 1

//   Body() {
//     div(this.count)
//   }
// }

class TestView extends View {
  toggle = true
  ok = 1

  @SubView
  nn({ _$content }) {
    div(_$content)
  }

  @SubView
  hh() {
    HStack()
    {
      this.nn(this.ok)
    }
  }

  /** @view */
  Body() {
    button("toggle")
      .onclick(() => {
        this.toggle = !this.toggle
      })
    if (this.toggle) {
      this.hh()
    } else {
      "fuck you"
    }
  }
}

export default TestView
