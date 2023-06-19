// ~> PageTitle.view.js
import DLight, { View } from "@dlightjs/dlight"

class PageTitle extends View {
  pageTitle = ""

  didMount() {
    this.pageTitle = document.title
  }

  Body() {
    p(`Page title is ${this.pageTitle}`)
  }
}

export default PageTitle
