import {
  Children,
  Content,
  Main,
  Model,
  Prop,
  View,
  Watch,
  button,
  div,
  h1,
  h2,
  input,
  insertChildren,
  use,
} from "@dlightjs/dlight"

@View
class MyComp {
  model = use(ModelJ)

  ok = this.model.ok

  View() {
    button("reset").onClick(this.model.change)
    // div(this.aa.jj)
  }
}

@Model
class ModelJ {
  jj = { ok: 100 }
  // ok = this.jj.ok
  change() {
    this.jj = null
  }
}
@View
class Portal {
  @Children content
  @Prop mount
  bodyEl
  previousContent
  didMount() {
    console.log(this.mount)
    if (this.mount) {
      this.previousContent = this.mount.innerHTML
      this.mount.innerHTML = ""
    } else {
      const el = document.createElement("div")
      document.body.appendChild(el)
      this.bodyEl = el
      this.mount = el
    }

    insertChildren(this.mount, this.content)
  }

  willUnmount() {
    if (this.bodyEl) {
      document.body.removeChild(this.bodyEl)
    } else {
      this.mount.innerHTML = this.previousContent
    }
  }
}

@View
@Main
class App {
  arr = [1, 2, 3]
  count = 0
  el = null

  didMount() {
    console.log("didMount", this.el)
  }
  Body() {
    div().ref(this.el)
    {
      if (this.arr.length > 0) {
        div(`${this.count} ++ `)

        div()
        {
          for (const i of this.arr) {
            key: i
            div(i)
          }
        }
      }
    }
    Portal().mount(this.el)
    {
      h1("Portal")
      h2("Portal")
    }

    button(this.count).onClick(() => {
      if (this.count === null) {
        this.count = 0
      }
      this.count++
    })
    button("reset").onClick(() => {
      this.count = null
    })
  }
}

export default App
