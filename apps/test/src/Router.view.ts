import { View } from "@dlightjs/dlight"
import { Route, RouterSpace } from "../../../packages/@dlightjs/components/src/Router"
import { button, div, Env, State } from "@dlightjs/types"

class SubComp2 extends View {
  @State toggle = true
  @Env RouteParam

  @State secondNav

  Body() {
    div()
      ._display("flex")

    button("hhh2h")
      .onclick(() => {
        this.secondNav.to("./not")
      })
    button("222")
      .onclick(() => {
        this.secondNav.to("/OKK")
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
  @State navigator
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
