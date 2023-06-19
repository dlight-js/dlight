// ~> Routing.view.js
import DLight, { View } from "@dlightjs/dlight"
import { RouterSpace, Route } from "@dlightjs/components"

class Routing extends View {
  Body() {
    RouterSpace()
    {
      Route("/")
      {
        HomeView()
      }
      Route("/about")
      {
        AboutUsView()
      }
    }
  }
}

export default Routing
