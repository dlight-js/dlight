import { View } from "@dlightjs/dlight"

@View
class Header {
  @Prop rightView
  @Prop centerView
  @Prop leftView
  Body() {
    div().style({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "50px",
      backgroundColor: "#333",
      color: "#fff",
      padding: "0 20px",
    })
    {
      if (this.leftView) {
        this.leftView
      }
      if (this.centerView) {
        this.centerView
      }
      if (this.rightView) {
        this.rightView
      }
    }
  }
}

@View
class PropViewClass {
  Body() {
    Header()
      .leftView(View => {
        div("hhhh")
      })
      .centerView(View => {
        div("PropViewTest")
      })
      .rightView(View => {
        div("close")
      })
  }
}

export default PropViewClass
