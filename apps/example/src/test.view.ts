import { View, renderToString } from "@dlightjs/dlight"
import { div } from "@dlightjs/easy-css"
import { button, htmlTag, SubView } from "@dlightjs/types"
import { HStack, Route, RouterSpace, VStack } from "@dlightjs/components"
import { MarkitView } from "@dlightjs/markit"

class NNN extends View {
  Body() {
    _(this._$children)
  }
}

class JJ extends View {
  @Env hh = "shit"
  Body() {
    div(this.hh)
  }
}
class TestView extends View {
  count = 5

  onclick() {
    this.count--
    console.log(this.count)
  }

  @SubView
  JJ() {
    div("jhh")
      .color("blue")
  }

  Body() {
    button("+")
      .addEvents({
        click: this.onclick
      })
    // .setAttributes({
    //   shit: `${this.count}`
    // })
    // .onclick(this.onclick)
    // div("okk")
    //   .height("100px")
    //   .color("red")
    env()
      .hh("nono")
    {
      env()
        .hh("jj")
      {
        env()
          .hh("lit")
        {
          JJ()
          NNN()
          {
            JJ()
          }
        }
      }
    }
  }
}

export class TestMarkit extends View {
  testMDString = `
Here's a simple footnote,[^1] and here's a longer one.[^bignote]

hhh
**b*o*ld**

***hhh*hh**

*italic*~~ddd~~test \`function test { console.log('hello')}\`

## 标题2

[haha](https://www.baidu.com)

\`\`\`js [config.js]
console.log('hello sd dyh');
function test () {
  const hh = 1
}
Body() {
  div()
    .className(this.dlightMarkitCodeBlock)
  {
    div(this.title)
      .className(this.dlightMarkitCodeBlockHeader)
    div()
      .className(this.dlightMarkitCode)
    {
      pre()
      {
        code()
          .innerHTML(this.highlightedCode)
      }
      div("copy")
    }
  }
}
\`\`\`

\`\`\`python
print("hhh")
a=12
b=15
c=a+b
\`\`\`

# heading1

## heading2

### heading3

----[dashed]
  `

  Body() {
    MarkitView(this.testMDString)
  }
}

console.log(renderToString(TestView))

export default TestView
