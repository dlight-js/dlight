import { View } from "@dlightjs/dlight"
import { headerWrap, navBtn, headerLogo } from "./style.module.css"

class Header extends View {
  navList = [
    {
      url: "",
      navName: "Docs"
    },
    {
      url: "https://www.baidu.com",
      navName: "Examples"
    },
    {
      url: "",
      navName: "Tutorials"
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

export default Header
