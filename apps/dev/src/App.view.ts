import { View } from "@dlightjs/dlight"
import {
  type Typed,
  type Pretty,
  button,
  ForwardProps,
  Prop,
  Watch,
  required,
} from "@dlightjs/types"

interface SubProp {
  name?: string
  onClick: () => void
}
@View
class Sub {
  @Prop name = required
  @Prop onClick = required

  @Watch
  watchName() {
    console.log(this.name)
  }

  View() {
    button(this.name).onClick(this.onClick)
  }
}

const SubView = Sub as Pretty as Typed<SubProp>

@View
class Ok {
  @Prop changeCount
  @Prop count

  didMount() {
    this.changeCount()
    console.log(this.count)
  }

  View() {
    div("change")
  }
}

@View
class Ok2 {
  @Prop ok

  View() {
    this.ok
  }
}

;`
Ok2().ok(View => {
  div(this.count)
  Ok().changeCount(() => {
    this.count++
  })
})

if (this.count) {
  div(this.count)
  Ok().changeCount(() => {
    this.count++
  })
}

switch (this.count) {
  case 1:
    div(this.count)
    Ok().changeCount(() => {
      this.count++
    })
  case 2:
    "ok"
  case 3:
    "nono"
    break
  default:
    "shit"
}

for (const a of this.arr) {
  div(this.count)
  Ok().changeCount(() => {
    this.count++
  })
}

`
@View
class App {
  count = 0
  arr = [1, 2, 3]

  View() {
    div(this.count)
    Ok()
      .count(this.count)
      .changeCount(() => {
        this.count++
      })
    button("click").onClick(() => {
      this.count++
    })
  }
}

export default App as Pretty as Typed
