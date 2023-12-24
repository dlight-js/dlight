import { View } from "@dlightjs/dlight"

@View
class ColumnCenterView {
  @Children children

  View() {
    div()
      .style({ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" })
    {
      this.children
    }
  }
}

@View
class ChildrenView {
  View() {
    ColumnCenterView()
    {
      div("short")
      div("long long long text")
      div("short")
    }
  }
}

export default ChildrenView
