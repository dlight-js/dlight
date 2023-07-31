import { View, renderToString } from "@dlightjs/dlight"
import { div } from "@dlightjs/easy-css"
import { button, htmlTag, SubView } from "@dlightjs/types"
import { HStack, Route, RouterSpace, VStack } from "@dlightjs/components"

class TestView extends View {
  Body() {
    button("hello world")
    // .onclick(() => {
    //   console.log("jj")
    // })

      .setAttributes({
        "dynamic-id": "111",
        "will-click": "",
        "will-mouseover": "",
        "dynamic-path": "./test"
      })
  }
}

export default TestView
