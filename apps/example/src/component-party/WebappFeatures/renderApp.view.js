// ~> index.html
// <!DOCTYPE html>
// <html>
//   <body>
//     <div id="app"></div>
//     <script type="module" src="./main.js"></script>
//   </body>
// </html>

// ~> App.view.js
import DLight, { View } from "@dlightjs/dlight"

class App extends View {
  Body() {
    h1("Hello world")
  }
}

export default App

// ~> main.js
import { render } from "@dlightjs/dlight"
import App from "./App.view"

render("app", App)