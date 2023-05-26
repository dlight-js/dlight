import { View } from "@dlightjs/dlight"
import { _, button, div, Prop, PropState, required, State, tag, html, h3 } from "@dlightjs/types"
import { Await, StateObject, Watch } from "@dlightjs/decorators"
import { css, styled } from "@dlightjs/emotion"
import { HStack } from "@dlightjs/components"

export class TestView extends View {
  @View
  ok() {
    "fuck"
  }

  Body() {
    this.ok()
  }
}
