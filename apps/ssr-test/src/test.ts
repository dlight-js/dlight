import DLight, { View, hydrateElement, hydrateComponent } from "@dlightjs/dlight-client"

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
    hydrateElement(dlNode => {
      dlNode._$addEvent("click", () => {
        this.count++
      })
      dlNode._$addEvent("mouseover", () => {
        console.log("over")
      })
    }, this, {
      hasEvent: true
    })
    hydrateComponent(dlNode => {
      dlNode._$addProp("count", () => this.count, this, ["count"])
    }, this, ["count"])
    hydrateComponent(dlNode => {
      dlNode._$addProp("count", () => 1000 + this.count, this, ["count"])
    }, this, ["count"])
    hydrateElement(dlNode => {
      dlNode._$addProp("innerText", () => this.count, this, ["count"])
    }, this, {
      deps: ["count"]
    })
  }
}

export default App
