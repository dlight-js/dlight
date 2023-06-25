import { HStack } from "@dlightjs/components"
// import { css } from "@dlightjs/emotion"
import { transformWithEsbuild } from "vite"
import { DLightIcon, DLightIconType, HelpOutlineOutlined } from "@dlightjs/material-icons"
import MarkitView from "@dlightjs/markit"

class GG extends View {
  _$forwardProps = true
  Body() {
    div("okkkk")
      .forwardProps()
  }
}

class HH extends View {
  _$forwardProps = true
  Body() {
    GG()
      .forwardProps()
  }
}

const testMDString = `
hhh
**b*o*ld**

***hhh*hh**

*italic*~~ddd~~test \`function test { console.log('hello')}\`

[haha](https://www.baidu.com)

# heading1

## heading2

### heading3

----[dashed]

#### heading4

* hhh
* apple
  * pear
    * gug
* pear


- [x] checklist
- [x] done

`

class TestView extends View {
  count = 1
  Body() {
    MarkitView(testMDString)
    // HelpOutlineOutlined()
    //   .style({
    //     backgroundColor: "red"
    //   })
  }
}

export default TestView



