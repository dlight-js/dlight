import DLight, { View, initHydration } from "@dlightjs/dlight-client"

const { hydrate, hydrationMap } = initHydration()

export { hydrationMap }

class App extends View {
  _$$count = 0
  _$$countDeps = new Set()
  get count() {
    return this._$$count
  }

  set count(value) {
    this._$updateProperty("count", value)
  }

  Body() {
    hydrate(element => {
      const _$node0 = new DLight.HtmlNode(element)
      _$node0._$addEvent("click", () => {
        this.count++
      })
      _$node0._$addEvent("mouseover", () => {
        console.log("over")
      })
    }, this)
    hydrate(element => {
      const _$node1 = new DLight.HtmlNode(element)
      _$node1._$addProp("innerText", () => this.count, this, ["count"])
    }, this, ["count"])
  }
}

export default App
