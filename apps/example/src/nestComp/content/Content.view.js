import { View } from "@dlightjs/dlight"

@View
class BeautifulButton {
  @Content content = ""
  @Prop onclick = undefined

  View() {
    button(this.content)
      .style({ fontWeight: "bold", borderWidth: "0px", padding: "10px 10px", margin: "10px", borderRadius: "10px", color: "orange" })
      .onclick(this.onclick)
  }
}

@View
class ContentView {
  count = 0

  View() {
    h2(`Count: ${this.count}`)
    BeautifulButton("Add")
      .onclick(() => {
        this.count++
      })
    BeautifulButton("Minus")
      .onclick(() => {
        this.count--
      })
  }
}

export default ContentView
