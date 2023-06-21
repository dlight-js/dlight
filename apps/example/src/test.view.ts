import { HStack } from "@dlightjs/components"
import DLight, { View, $, type CustomNode } from "@dlightjs/dlight"
import { styled } from "@dlightjs/emotion"
import { path, required, span, svg } from "@dlightjs/types"
import { div, Prop, type Typed, _, button, SubView } from "@dlightjs/types"
import { transformWithEsbuild } from "vite"
import { DLightIcon, DLightIconType, HelpOutlineOutlined } from "@dlightjs/material-icons"

const elementKeys = [...Object.getOwnPropertyNames(document.createElement("div")), "_$content"]

class Div extends View {
  _$content
  _$forwardProps = true
  @Static divKeys = []
  @Static okeys = []

  willMount() {
    const keys = [...new Set(
      Object.getOwnPropertyNames(this)
        .filter(m => this[m] === "prop")
        .map(m => m.replace(/^_\$\$\$/, ""))
    )]

    this.divKeys = keys.filter(key => elementKeys.includes(key))
    this.okeys = keys.filter(key => !elementKeys.includes(key))
    console.log(this.okeys.join(" "), this.okeys.map(o => this[o]))
  }

  Body() {
    div(this._$content)
      .className(this.okeys.join(" "))
      .do((node) => {
        for (const key of this.divKeys) {
          node._$addProp(key, () => this[key], this, [key])
        }
      })
  }
}

class G extends View {
  @Prop id

  didUnmount() {
    console.log(this.id)
  }

  Body() {
    div(this.id)
  }
}

class TestView extends View {
  apples = [1, 2, 3]
  Body() {
    for (const i of this.apples) {
      G()
        .id(i)
    }
    button("-")
      .onclick(() => {
        this.apples = [...this.apples.slice(1)]
        console.log(this.apples)
      })
  }
}

console.time("1")
for (let i = 0; i < 10000; i++) {
  if (`${i}`.startsWith("jjjj")) {
    i++
  }
}
console.timeEnd("1")

export default TestView
