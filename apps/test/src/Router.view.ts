import { View } from "@dlightjs/dlight"
import { Route, RouterSpace } from "../../../packages/@dlightjs/components/src/Router"
import { button, div, Env, State } from "@dlightjs/types"

class SubComp2 extends View {
  toggle = true
  @Env RouteParam

  secondNav

  Body() {
    div()
      ._display("flex")

    button("toggle")
      .onclick(() => {
        this.toggle = !this.toggle
      })
    button("./not")
      .onclick(() => {
        this.secondNav.to("./not")
      })
    button("./hi")
      .onclick(() => {
        this.secondNav.to("./hi")
      })

    if (this.toggle) {
      RouterSpace()
        .mode("hash")
        .navigator(this.secondNav)
      {
        Route("hi")
        {
          div("hi niubi")
        }
        Route("not")
        {
          div("not hihi")
        }
        Route()
        {
          div("nono")
        }
      }
    }
  }
}

class SubComp extends View {
  @Env RouteParam
  didMount(_els: HTMLElement[], _node: CustomNode) {
    console.log("hello")
  }

  Body() {
    div(this.RouteParam.path)
    div("hhhh")
  }
}

export class RouteTest extends View {
  navigator
  Body() {
    div("hh")
    button("push to /OKK")
      .onclick(() => {
        this.navigator.to("/OKK")
      })
    button("push to /fuck")
      .onclick(() => {
        this.navigator.to("/fuck")
      })
    button("push to /fuck")
      .onclick(() => {
        this.navigator.to("..")
      })
    RouterSpace()
      .navigator(this.navigator)
      .mode("hash")
    {
      Route("OKK")
      {
        div("okk")
      }
      Route("fuck")
      {
        SubComp2()
      }
    }
  }
}
