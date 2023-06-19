// ~> Time.view.js
import DLight, { View } from "@dlightjs/dlight"

class Time extends View {
  time = new Date().toLocaleTimeString()
  timer

  didMount() {
    this.timer = setInterval(() => {
      this.time = new Date().toLocaleTimeString()
    }, 1000)
  }

  willUnmount() {
    clearInterval(this.timer)
  }

  Body() {
    p(`Current time: ${this.time}`)
  }
}

export default Time
