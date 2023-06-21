import DLight, { View } from "@dlightjs/dlight"
import { headerWrap, navBtn, headerLogo } from "./style.module.css"
import { type Typed, div, img, SubView, a } from "@dlightjs/types"

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

  @SubView
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

export default Header as any as Typed<Header>
