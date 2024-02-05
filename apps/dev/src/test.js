@Data
class MyData {
  data
  loading = true

  async willMount() {
    this.data = await fetch("hh")
    this.loading = false
  }
}

@View
class App {
  myData = new MyData()

  View() {
    if (this.myData.loading) {
      div("Loading...")
    } else {
      Comp().data(this.myData.data)
    }
  }
}


@Data
class WindowSize {
  width = window.innerWidth
  height = window.innerHeight

  constructor() {
    window.addEventListener("resize", () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
    })
  }
}

@View
class App {
  windowSize = new WindowSize()

  View() {
    div(`Width: ${this.windowSize.width}, Height: ${this.windowSize.height}`)
  }
}
