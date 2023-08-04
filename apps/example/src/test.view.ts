import { View, renderToString } from "@dlightjs/dlight"
import { css, div } from "@dlightjs/easy-css"
import { button, htmlTag, Prop, required, SubView } from "@dlightjs/types"
import { HStack, Route, RouterSpace, VStack } from "@dlightjs/components"
import { MarkitView, addBlockRule } from "@dlightjs/markit"

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
addBlockRule({
  name: "CodeBlock",
  rule: {
    getProps: raw => {
      const text = raw.replace(/ *```|```$/g, "")
      let [language, title] = (text.match(/^.+?\n/g) ?? ["text"])[0].replace("```", "").trim().split("[")
      if (title) {
        title = title.replace("]", "")
      }
      return { language, title }
    }
  },
  view: AdvantageBlock
})

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

export default TestView
