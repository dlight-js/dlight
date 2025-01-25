import { View } from "@dlightjs/dlight"

@View
class Reactivity {
  rotationAngle = 0

  Body() {
    svg()
      .xmlns("http://www.w3.org/2000/svg")
      .width("100")
      .height("100")
      .viewBox("0 0 24 24")
      .fill("none")
      .stroke("currentColor")
      .strokeWidth("2")
      .strokeLinecap("round")
      .strokeLinejoin("round")
      .class("lucide lucide-biceps-flexed")
    {
      g().transform(
        `translate(-12 12) rotate(${this.rotationAngle} 12 12) translate(12 -12)`
      )
      {
        path().d("m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9")
        path().d("M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z")
      }
    }

    button("<").onclick(() => {
      this.rotationAngle -= 10
    })
    button(">").onclick(() => {
      this.rotationAngle += 10
    })
  }
}

export default Reactivity
