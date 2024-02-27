import { feFuncA } from "@dlightjs/dlight"

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
  windowSize = Model(WindowSize, { prop1: 1 })

  windowSize = WindowSize.modeling({ prop1: 1 })

  View() {
    div(`Width: ${this.windowSize.width}, Height: ${this.windowSize.height}`)
  }
}





@View
class jj {

  View() {
    const node = new TryUnit((_$tryNode) => {
      try {
        update = 
        ...
      } catch {
        _$tryNode.shit
        tryNode.caught(tryNode.geneNewNodesInEnv(() => {
          ...
        }))
      }
    })
  }
}

