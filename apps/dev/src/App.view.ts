import {
  View,
  update,
  Model,
  use,
  Modeling,
  Pretty,
  Prop,
  Watch,
  button,
  div,
  Main,
  Mount,
} from "@dlightjs/dlight"

import { Button } from "./Button100.view"

@Model
class DDData {
  @Env ok
  count = 3
  arr = [1, 2, 3]
  fetch = use(FetchModel, { id: 1 })

  jj = (() => {
    console.log(this.ok, "fuck")
  })()
  willMount() {
    console.log(this.ok, "nno")
  }
}
const DD = DDData as Pretty as Modeling<DDData>
@Model
class Fetch {
  @Prop id
  data
  loading = true
  @Env ok

  @Watch
  async fetch() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${this.id}`
    )
    await new Promise(resolve => setTimeout(resolve, 1000))
    this.data = await res.json()
    this.loading = false
    console.log(this.data)
  }

  willMount() {
    console.log("nno", this.ok)
  }
}

const FetchModel = Fetch as Pretty as Modeling<Fetch, { id: number }>
@View
class Comp {
  dd = use(DD)
  @Env ok

  willMount() {
    console.log(this.ok, "11")
  }
  View() {
    div("hh")
  }
}

@View
class CC {
  @Prop a
  @Prop count
  View() {
    if (this.a) {
      div("ok")
    }
    div(this.count)
  }
}

@Model
class JJ {
  @Prop count = 0
  jj = this.count
}

@Main
@View
class App {
  count = 1
  jj = use(JJ, { count: this.count })
  View() {
    // env().ok("100")
    // {
    //   Comp()
    // }
    div(this.jj.jj.toString())
    button("+").onClick(() => {
      this.jj.jj++
    })
    button("+").onClick(() => {
      this.count++
    })
  }
}

export default App
