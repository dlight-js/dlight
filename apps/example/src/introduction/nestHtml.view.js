import { View } from "@dlightjs/dlight"

@View
class NestHtml {
  View() {
    div()
      .style({ backgroundColor: "gray", height: "200px" })
    {
      ul()
      {
        li("Index1")
        li("Index2")
        li("Index3")
      }
    }
  }
}

export default NestHtml
