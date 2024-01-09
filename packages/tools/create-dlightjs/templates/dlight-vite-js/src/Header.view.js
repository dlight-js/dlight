import { View } from "@dlightjs/dlight"
import { headerWrap, navBtn, headerLogo } from "./style.module.css"

@View
export default class Header {
  navList = [
    {
      url: "https://dlight-js.com/docs",
      navName: "Docs"
    },
    {
      url: "https://dlight-js.com/examples",
      navName: "Examples"
    },
    {
      url: "https://dlight-js.com/playground",
      navName: "Playground"
    }
  ]

  View() {
    div()
      .class(headerWrap)
    {
      img()
        .src("./logo_title.png")
        .class(headerLogo)
      div()
      {
        for (const navItem of this.navList) {
          a(navItem.navName)
            .class(navBtn)
            .href(navItem.url)
        }
      }
    }
  }
}
