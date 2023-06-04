// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { button, div, SubView } from "@dlightjs/types"
import { HStack } from "@dlightjs/components"

function getData() {
  return {
    id: Math.random(),
    tt: Math.random()
  }
}
class TestView extends View {
  Body() {
    HStack()
    {
      div("hhh")
      div("haha")
      div("haha")
      div("haha")
      div("haha")
    }
  }
}

export default TestView
