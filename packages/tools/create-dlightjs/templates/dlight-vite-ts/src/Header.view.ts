import { View } from "@dlightjs/dlight"
import { headerWrap, navBtn, headerLogo } from "./style.module.css"
import { type Typed, div, img, a type Pretty } from "@dlightjs/types"

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

  @View
  Nav({ url, navName }: any): any {
    a(navName)
      .className(navBtn)
      .href(url)
  }

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
          this.Nav({})
            .url(navItem.url)
            .navName(navItem.navName)
        }
      }
    }
  }
}

export default Header as Pretty as Typed
