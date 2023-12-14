// @ts-ignore
import { Children, Content, Prop, View, Watch, required } from "@dlightjs/dlight"
import { type Typed, type Pretty, div, button, p, span } from "@dlightjs/types"

@View
class JJ {
  @Prop count = 1

  Body() {
    button("+++")
      .onclick(() => {
        this.count ++
      })
    div(); {
      p(this.count)
    }
  }
}

@View
class App {
  count = 1
  jj = 2

  Body() {
    button("+")
      .onclick(() => {
        this.count++
      })
    div(); {
      div(); {
        span(this.count)
          .className(this.jj)
        div(); {
          a(this.jj)
        }
      }
      JJ()
      .count(this.count)
      h1("hello")
        .id("shit")

    // for (const i of this.arr) {
    //   span(`This is ${i}`)
    // }
    }
    
  }
}

export default App as Pretty as Typed

// const a = document.createElement("div")
// a.textContent = "hh"
// const prev = "hh"
// const t1 = performance.now()
// for (let i = 0; i < 100000; i++) {
//   if (prev !== "hh") {
//     a.textContent = "hh"
//   }
// }
// console.log(performance.now() - t1)
