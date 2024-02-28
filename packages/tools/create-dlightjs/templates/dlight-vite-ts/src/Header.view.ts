import { View, type Typed, div, img, a, Snippet, type Pretty, type SnippetTyped } from "@dlightjs/dlight"
import { headerWrap, navBtn, headerLogo } from "./style.module.css"

interface NavProps {
  url: string
  navName: string
}

@View
class Header {
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

  @Snippet
  Nav = (({ url, navName }: NavProps) => {
    a(navName)
      .class(navBtn)
      .href(url)
  }) as Pretty as SnippetTyped<NavProps>

  Body() {
    div()
      .class(headerWrap)
    {
      img()
        .src("./logo_title.png")
        .class(headerLogo)
      div()
      {
        for (const navItem of this.navList) {
          this.Nav()
            .url(navItem.url)
            .navName(navItem.navName)
        }
      }
    }
  }
}

export default Header as Pretty as Typed
