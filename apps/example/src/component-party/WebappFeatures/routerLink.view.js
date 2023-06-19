// ~> Router.view.js
import DLight, { View } from "@dlightjs/dlight"

class Router extends View {
  @Env navigator

  Body() {
    ul()
    {
      li()
      {
        a("Home")
          .onclick(() => {
            this.navigator.to("/")
          })
      }
      li()
      {
        a("About us")
          .onclick(() => {
            this.navigator.to("/about")
          })
      }
    }
  }
}

export default Router
