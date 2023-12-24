import { View } from "@dlightjs/dlight"

@View
class Element {
  color = "gray"
  count1 = 0
  count2 = 0
  count3 = 0
  element1
  element2

  handleClick(e) {
    if (e.target === this.element1) {
      this.count1++
    } else if (e.target === this.element2) {
      this.count2++
    }
  }

  willMount() {
    window.addEventListener("click", this.handleClick.bind(this))
  }

  willUnmount() {
    window.removeEventListener("click", this.handleClick.bind(this))
  }

  View() {
    div().style({ backgroundColor: "gray", height: "500px" })
    {
      div(`Child1, click count: ${this.count1}`).element(this.element1).style({
        backgroundColor: "blue",
        height: "100px",
        width: "150px",
        color: "white",
      })
      div(`Child2, click count: ${this.count2}`)
        .element(this.element2)
        .style({ backgroundColor: "orange", height: "100px", width: "150px" })
      div(`Child3, click count: ${this.count3}`)
        .element(el => {
          el.addEventListener("click", () => {
            this.count3++
          })
        })
        .style({ backgroundColor: "white", height: "100px", width: "150px" })
    }
  }
}

export default Element
