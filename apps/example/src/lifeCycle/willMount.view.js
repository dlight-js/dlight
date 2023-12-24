import { View } from "@dlightjs/dlight"

@View
class WillMount {
  color = "gray"

  handleClick(e) {
    this.color = this.color === "gray" ? "orange" : "gray"
  }

  willMount() {
    window.addEventListener("click", this.handleClick.bind(this))
  }

  willUnmount() {
    window.removeEventListener("click", this.handleClick.bind(this))
  }

  View() {
    div()
      .style({ backgroundColor: this.color, height: "500px" })
  }
}

export default WillMount
