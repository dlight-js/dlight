import { View } from "@dlightjs/dlight"
import { _, env, button, div, Prop, PropState, required, State, tag, html, h3 } from "@dlightjs/types"
import { Await, StateObject, Watch } from "@dlightjs/decorators"
import { css, styled } from "@dlightjs/emotion"
import { HStack } from "@dlightjs/components"

async function sleep() {
  return await new Promise(res => setTimeout(res, 1000))
}

async function hh() {
  await sleep()

  return 100
}

const A = styled.div`
  color: ${({ count }) => count > 0 ? "red" : "blue"};
`
class MyComp2 extends View {
  count = 0
  @Prop a

  Body() {
    button("+")
      .onclick(() => {
        this.a++
      })
  }
}

export class TestView extends View {
  count = 0

  Body() {
    button("-")
      .onclick(() => {
        this.count--
      })
    div(this.count)
    MyComp2()
      .a(this.count)
  }
}
