import { View } from "@dlightjs/dlight"
import { _, button, div, Prop, PropState, required, State, tag, html, h3 } from "@dlightjs/types"
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

export class TestView extends View {
  @Await @State data = hh()

  Body() {
    if (this.data) {
      div(this.data)
    } else {
      div("股价瓶")
        ._color("red")
    }
  }
}
