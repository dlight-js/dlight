import {
  View,
  type Pretty,
  type Typed,
  Main,
  button,
  div,
} from "@dlightjs/dlight"

interface TestProps {}

function loopNodes(nodes: any, runFunc: any) {
  const stack = [...nodes].reverse()
  while (stack.length > 0) {
    const node = stack.pop()
    runFunc(node)
    if (!("_$dlNodeType" in node)) {
      if (node._$nodes) {
        stack.push(...[...node._$nodes].reverse())
      } else {
        stack.push(...[...node.childNodes].reverse())
      }
    } else node._$nodes && stack.push(...[...node._$nodes].reverse())
  }
}
@Main
@View
class Test implements TestProps {
  arr = []
  bbb = [1, 2, 3]
  didMount() {
    const add = nodes => {
      loopNodes(nodes, node => {
        if (node.initNewNodes) {
          const baseInitNewNodes = node.initNewNodes
          node.initNewNodes = function (newNodes: any) {
            baseInitNewNodes.call(this, newNodes)
            add(newNodes)
            console.log("ok")
          }
          console.log(node, "jjj")
        }
      })
    }

    add(this._$nodes)
  }
  View() {
    button("+").onClick(() => {
      // this.arr.push(1)
      this.bbb.push(1)
    })
    button("+").onClick(() => {
      this.arr.push(1)
      // this.bbb.push(1)
    })
    for (const a of this.arr) {
      for (const b of this.bbb) {
        div(b)
      }
    }
  }
}

export default Test as Pretty as Typed<TestProps>
