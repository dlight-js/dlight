import { RouterSpace, Route } from "@dlightjs/components"
import DLight, { View } from "@dlightjs/dlight"
import { button, div, Env, State } from "@dlightjs/types"

class SubComp2 extends View {
  toggle = false
  navigator

  didMount() {
    console.log("fuck")
  }

  Body() {
    div()

    button("toggle")
      .onclick(() => {
        this.toggle = !this.toggle
      })
    button("./not")
      .onclick(() => {
        this.navigator.to("./not")
      })
    button("./hi")
      .onclick(() => {
        this.navigator.to("./hi")
      })

    if (this.toggle) {
      div("hi niubi")
      RouterSpace()
        .getNavigator(nav => { this.navigator = nav })
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

class JJ extends View {
  didMount() {
    console.log("shit")
  }

  Body() {
    "hh"
  }
}

export class RouteTest extends View {
  navigator
  Body() {
    div("hh")
    a("push to /OKK")
      .href("/OKK")
    // button("push to /OKK")
    //   .onclick(() => {
    //     this.navigator.to("/OKK")
    //   })
    button("push to /fuck")
      .onclick(() => {
        this.navigator.to("/fuck")
      })
    button("back")
      .onclick(() => {
        this.navigator.to("..")
      })
    RouterSpace()
      .getNavigator(nav => { console.log(nav); this.navigator = nav })
    {
      Route("OKK")
      {
        JJ()
      }
      Route("fuck")
      {
        SubComp2()
      }
    }
  }
}
