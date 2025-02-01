import {
  Prop,
  View,
  Watch,
  button,
  div,
  render,
  type Pretty,
  type Typed,
} from "@dlightjs/dlight"

@View
class _DataView {
  @Prop count: number = 0

  @Watch
  watcher() {
    // @ts-expect-error intentional error
    console.log(this.count, this.count.notExist) // Error occurs here
  }

  Body() {}
}

const DataView = _DataView as Pretty as Typed<_DataView>

@View
export class App {
  w: number = 0
  count: number | null = null

  jj() {
    this.w = 1
  }

  Body() {
    try {
      DataView().count(this.count ?? 0)
      button("Click Me").onClick(() => {
        this.count = null
      })
    } catch (e) {
      if (e instanceof Error) div(e.message)
      else throw e
    }
  }
}

render("main", App)
