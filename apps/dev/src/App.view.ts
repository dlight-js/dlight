// @ts-ignore
import { Children, Content, Prop, View, Watch, required } from "@dlightjs/dlight"
import { type Typed, type Pretty, div, button, p, span } from "@dlightjs/types"

@View
class COOO {
  @Children(1)
    hh

  @Children(1)
    hhj

    @Env no
    @Env jj
  count = 100000

  Body() {
    button("+")
      .onclick(() => {
        this.count ++
      })
    for (const i of Array.from({length: this.count})) {
      div(this.no)
    }
    this.hh
    div(this.no)
    this.jj
    this.hhj
  }
}
const COOOView = COOO as Pretty as Typed

@View
class App {
  count = 1
  doubleCount = this.count * 2

  toggle = false
  @Watch
  shit() {
    console.log(this.count)
  }

  log() {
    console.log("hhhh")
  }

  list = [1, 2, 3]

  @View
  ok({ hello }) {
    div(hello)
  }

  Body() {
    button("+")
      .onclick(() => {
        this.count ++
      })
    div(this.count)
    .style({fontSize: `${this.count + 10}px`})
    this.ok()
      .hello("hello")
    env()
    .jj(1)
      .no(200)
      {

      env()
        .no(this.count)
      {
       COOO()
      }
    }
    
      
  }
}

export default App as Pretty as Typed
