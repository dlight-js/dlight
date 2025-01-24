import { View, Snippet } from "@dlightjs/dlight"

@View
class SubView {
  count = 0

  @Snippet
  BeautifulButton({ text, onclick }) {
    button(text)
      .style({ fontWeight: "bold", borderWidth: "0px", padding: "10px 10px", margin: "10px", borderRadius: "10px", color: "orange" })
      .onclick(onclick)
  }

  Body() {
    h2(`Count: ${this.count}`)
    this.BeautifulButton()
      .text("Add")
      .onclick(() => {
        this.count++
      })
    this.BeautifulButton()
      .text("Minus")
      .onclick(() => {
        this.count--
      })
  }
}

export default SubView
