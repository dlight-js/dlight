// @ts-ignore
import { Children, Content, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, type Pretty, div, button, p, span } from "@dlightjs/types"

@View
class Comp {
  @Prop message = "shit"

  Body() {
    div()
    {
      div(this.message)
    }
  }
}
const CompView = Comp as Pretty as Typed

@View
class Comp2 {
  message = "Hello"

  Body() {
    CompView()
      .message(this.message)
  }
}
const CompView2 = Comp2 as Pretty as Typed

@View
class Comp3 {
  Body() {
    CompView2()
  }
}
const CompView3 = Comp3 as Pretty as Typed

@View
class JJJ {
  @Prop jjj = "shit"
  Body() {
    div(`this is ${this.jjj}`)
    CompView2()
  }
}
const JJJView = JJJ as Pretty as Typed

@View
class COOO {
  Body() {
    JJJView()
  }
}
const COOOView = COOO as Pretty as Typed

@View
class App {
  count = 1
  toggle = false

  shit = {
    ok: true,
    aa: 100,
    str: "jjjj"
  }

  jj = [1, 2, 3]

  el
  didMount() {
    console.log("shit", this.el)
  }

  @View
  Shit({ ok, content }) {
    div(content)
    div(ok)
  }

  Body() {
    div(this.shit.aa)
    div(String(this.shit.ok))
    div(this.shit.str)

    div("------- above shit ---------")
    div(this.count)
    button("+")
      .onclick(() => {
        this.count++
      })
      .element((el) => {
        console.log(el)
      })

    for (const [idx, i] of this.jj.entries()) {
      div(`${idx}`)
        .onclick((i) => {
          console.log(i)
        })
    }
    button(`toggle ${this.toggle}`)
      .onclick(() => {
        this.toggle = !this.toggle
      })
    "fae"
    if (this.toggle) {
      div("okkk")
    } else {
      div("not ok")
        .style({
          color: "red"
        })
    }

    COOOView()
  }
}

console.log(App.toString())
export default App as Pretty as Typed
