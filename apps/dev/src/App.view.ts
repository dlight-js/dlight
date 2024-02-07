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
  count = 3
  arr = [1, 2, 3]
  private ok() {}

  willMount() {
    console.log(this.count, "cool")
  }
}
const DD = DDData as Pretty as Modeling<DDData>
@Model
class Fetch {
  @Prop id
  data
  loading = true

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
}

const FetchModel = Fetch as Pretty as Modeling<Fetch, { id: number }>

@Mount(document.getElementById("main"))
@View
class App {
  data = use(DD)

  fetchData = use(FetchModel, {
    id: this.data.count,
  })
  // fetchData = FetchModel.modeling({ id: this.data.count })

  willMount() {
    console.log("willMount")
  }

  View() {
    button("+").onClick(() => {
      this.data.count++
    })
    button("push").onClick(() => {
      this.data.arr.push(this.data.count)
    })

    for (const i of this.data.arr) {
      div(i)
    }

    if (this.fetchData.loading) {
      div("loading")
    } else {
      div(JSON.stringify(this.fetchData.data))
    }
  }
}

export default App
