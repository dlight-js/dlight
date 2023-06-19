// ~> CssStyle.view.js
import DLight, { View } from "@dlightjs/dlight"
import "./style.css"

class CssStyle extends View {
  Body() {
    h1("I am red")
      .className("title")
    button("I am a button")
      ._fontSize("10rem")
  }
}

export default CssStyle

// ~> style.css
// .title {
//   color: red;
// }
