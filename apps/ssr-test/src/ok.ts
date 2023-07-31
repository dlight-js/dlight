import DLight, { View, hydrateElement } from "@dlightjs/dlight-client"

class App extends View {
  _$$$count = "prop"
  _$$count
  _$$countDeps = new Set()
  get count() {
    return this._$$count
  }

  set count(value) {
    this._$updateProperty("count", value)
  }

  Body() {
    hydrateElement(dlNode => {
      dlNode._$addProp("innerText", () => `shit${this.count}`, this, ["count"])
    }, this, {
      deps: ["count"]
    })
    hydrateElement(dlNode => {
      dlNode._$addProp("innerText", () => `fuck${this.count}`, this, ["count"])
    }, this, {
      deps: ["count"]
    })
    hydrateElement(dlNode => {
      dlNode._$addEvent("click", () => {
        this.count++
      })
    }, this, {
      hasEvent: true,
      parentTriggers: ["count"]
    })
  }
}

export default App
