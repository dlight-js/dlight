import { View } from "@dlightjs/dlight"

@View
class ColumnCenterView {
  @Children children

  Body() {
    div()
      .style({ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" })
    {
      this.children
    }
  }
}

@View
class ChildrenView {
  Body() {
    ColumnCenterView()
    {
      div("short")
      div("long long long text")
      div("short")
    }
  }
}

export default ChildrenView
