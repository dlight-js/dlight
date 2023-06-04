// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { button, div, SubView } from "@dlightjs/types"

function getData() {
  return {
    id: Math.random(),
    tt: Math.random()
  }
}
class shitView extends View {
  toggle = true

  @SubView
  nono({ a }) {
    if (this.toggle) {
      div(a)
    }
    button("+")
      .onclick(() => {
        this.toggle = !this.toggle
      })
  }

  Body() {
    this.nono()
      .a("shit")
  }
}

class TestView extends View {
  toggle = true

  Body() {
    shitView()
    {
      div("hh")
    }
  }
}

export default TestView
