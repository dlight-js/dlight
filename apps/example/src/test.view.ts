import DLight, { View } from "@dlightjs/dlight"
// import { css } from "@dlightjs/emotion"
import { transformWithEsbuild } from "vite"
import { DLightIcon, DLightIconType, HelpOutlineOutlined } from "@dlightjs/material-icons"
import MarkitView, { addBlockRule, addInlineRule, InlineRenderer } from "@dlightjs/markit"
import { div, h1, Prop, required, type RequiredProp } from "@dlightjs/types"

class HHHHView extends View {
  @Prop _$content: RequiredProp<string> = required

  didMount() {
    console.log(this._$content)
  }

  Body() {
    div("hh")
  }
}

class OrangeView extends View {
  @Prop _$content = required

  didMount() {
    console.log(this._$content)
  }

  Body() {
    h1()
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
      }
    }
  }
}

addInlineRule({
  name: "Inlinehhhh",
  rule: {
    tag: /🍊(.+?)🍊/
  },
  view: OrangeView
})

addBlockRule({
  name: "HHHH",
  rule: {
    tag: /🥰(.+?)🥰/
  },
  view: HHHHView
})

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
Here's a simple footnote,[^1] and here's a longer one.[^bignote]

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

1. shdjsf
2. second

\`\`\`js
console.log('hello');
\`\`\`

- [x] checklist
- [x] done

| Syntax      | Description |
| ----------- | :-----------: |
| Header      | Title       |
| Paragraph   | Text        |

> https://www.baidu.com\\
> dsdfs

![The San Juan Mountains are beautiful!](http://static.runoob.com/images/demo/demo1.jpg "San Juan Mountains" 50% left)

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

🍊HHHH🍊

🥰xixixixii🥰

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
