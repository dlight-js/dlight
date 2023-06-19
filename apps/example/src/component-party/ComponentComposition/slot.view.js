// ~> App.view.js
import DLight, { View } from "@dlightjs/dlight"
import FunnyButton from "./FunnyButton.view"

class App extends View {
  Body() {
    FunnyButton()
    {
      "Click me!"
    }
  }
}

export default App

// ~> FunnyButton.view.js
class FunnyButton extends View {
  Body() {
    button()
      .style({
        background: "rgba(0, 0, 0, 0.4)",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "30px",
        border: "2px solid #fff",
        margin: "8px",
        transform: "scale(0.9)",
        boxShadow: "4px 4px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s",
        outline: "0"
      })
    {
      _(this._$children)
    }
  }
}

export default FunnyButton
