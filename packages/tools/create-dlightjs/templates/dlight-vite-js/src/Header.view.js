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

  Body() {
    div()
      .className(headerWrap)
    {
      img()
        .src("./logo_title.png")
        .className(headerLogo)
      div()
      {
        for (const navItem of this.navList) {
          a(navItem.navName)
            .className(navBtn)
            .href(navItem.url)
        }
      }
    }
  }
}
