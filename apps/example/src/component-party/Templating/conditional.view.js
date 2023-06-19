// ~> TrafficLight.view.js
import DLight, { View } from "@dlightjs/dlight"

const TRAFFIC_LIGHTS = ["red", "orange", "green"]

class TrafficLight extends View {
  lightIndex = 0
  light = TRAFFIC_LIGHTS[this.lightIndex]

  nextLight() {
    if (this.lightIndex + 1 > TRAFFIC_LIGHTS.length - 1) {
      this.lightIndex = 0
    } else {
      this.lightIndex++
    }
  }

  Body() {
    button("Next light")
      .onclick(this.nextLight.bind(this))
    p(`Light is: ${this.light}`)
    p()
    {
      "You must"
      if (this.light === "red") {
        span("STOP")
      } else if (this.light === "orange") {
        span("SLOW DOWN")
      } else if (this.light === "green") {
        span("go")
      }
    }
  }
}
