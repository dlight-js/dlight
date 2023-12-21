// @ts-ignore
import { Children, Content, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, type Pretty, button, p, span } from "@dlightjs/types"

@View
class Comp3 {
  @Env count = 0

  Body() {
    h3(this.count)
  }
}
@View
class Comp2 {
  @Env count = 0
  @Env jj = 0
  @Env array

  Body() {
    p(this.count)
      .style({ color: "red", fontSize: "30px" })
    span("jj")
    span(this.jj)
    env()
      .doublejj(this.jj * 2)
    {
      Comp3()
    }
  }
}
@View
class No {
  @Env count = 0
  jj = this.count * 2

  @Watch
  look() {
    console.log(this.count)
  }

  Body() {
    env()
      .jj(this.jj)
      .array([1, 2, 3])
    {
      h1(this.count)
      h2(this.jj)
      button()
        .onClick(() => {
          this.count++
        })
      Comp2()
    }
  }
}

@View
class Test {
  @Env ok = 44
  Body() {
    env()
      .count(this.ok)
    {
      h1(this.ok)
      Comp3()
    }
  }
}
@View
class App {
  count = 200
  arr = Array.from({ length: 2 }, (_, i) => i + 1)

  Body() {
    // env()
    //   .count(this.count)
    // {
    //   No()
    // }
    button("add")
      .onClick(() => {
        this.count++
      })
    button("add item")
      .onClick(() => {
        this.arr.push(this.arr.length + 1)
        this.arr = [...this.arr]
      })
    env()
      .ok(this.count)
    {
      for (const i of this.arr) {
        key: i
        Test()
      }
    }
  }
}

export default App as Pretty as Typed
