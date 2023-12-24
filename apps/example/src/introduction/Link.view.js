import { View } from "@dlightjs/dlight"

@View
class Link {
  View() {
    h2("Click on the links below to learn more about DLight:")
    a("DLight.js")
      .href("https://github.com/dlight-js/dlight")
  }
}

export default Link
