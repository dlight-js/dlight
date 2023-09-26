import { View, renderToString, Children, _, required, Content } from "@dlightjs/dlight"
import { css, div } from "@dlightjs/easy-css"
import { type Typed, button, type SubTyped, type Pretty } from "@dlightjs/types"
import { HStack, Route, RouterSpace, VStack } from "@dlightjs/components"
import { MarkitView, addBlockRule } from "@dlightjs/markit"
import { ForwardProp, Func } from "@dlightjs/decorators"
// import { Filter1Filled } from "@dlightjs/material-icons"

@ForwardProp
@View
class NNN {
  Body() {
    div()
      .forwardProps()
  }
}

function Watch() {

}

function parseData(msg: any) {
  msg.a++
}

function createObservableObject(target: any, func: Function, wrapper?: boolean) {
  // 定义handler对象
  const proxiedTarget = new Proxy(target, {
    set(obj, key, value) {
      if (typeof value === "object" && value !== null) {
        obj[key] = createObservableObject(value, func) // 如果值是一个对象，则再次对其进行代理
      } else {
        obj[key] = value
      }
      func()
      return true
    }
  })

  // 对每一个对象属性进行代理，确保嵌套对象也被代理
  if (!wrapper) {
    for (const key in target) {
      const value = target[key]
      if (typeof value === "object" && value !== null) {
        target[key] = createObservableObject(target[key], func)
      }
    }
  }

  return proxiedTarget
}

export function Observable(target: any, key: string) {
  const realKey = key.slice(3)

  if (delete target[realKey]) {
    let firstIn = true
    const newObservable = function() {
      this._$runDeps(realKey)
    }
    Object.defineProperty(target, realKey, {
      get() {
        if (firstIn) {
          this[key] = createObservableObject(this[key], newObservable.bind(this))
          firstIn = false
        }
        return this[key]
      },
      set(value) {
        this._$updateProperty(realKey, createObservableObject(value, newObservable.bind(this)))
      }
    })
  }
}

@View
@Func(OK)
class TestView {
  @Observable
    ok

  Body() {
    if (this.ok.loading) {
      div("loading")
        .style({
          color: "red"
        })
    } else {
      div(`Count: ${this.ok.data}`)
    }
    // div(`hello ${this.count}`)
    button("+")
      .onclick(() => {
        console.log(this.ok.loading)
        this.ok.data++
      })
  }
}

// export class TestMarkit extends View {
//   testMDString = `
// Search 🌟 in doc for important concepts and performance results.

// # Quick start

// DLight uses [vite](https://vitejs.dev/) to construct its apps. We mainly use [this vite plugin](https://www.npmjs.com/package/vite-plugin-dlight-transpiler) to transpile jsx/jsd file into pure js code.

// Three ways to try DLight.js out.

// * Use CLI to build a dlight app. (**This feature is still in development.**)

// \`\`\`shell
// npm install -g @dlightjs/cli
// create-dlight-app my-first-dlight-app
// \`\`\`

// * Clone this repo https://github.com/dlight-js/dlight-vite-template for a quick start.
// * 🌟 Play around in [codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-quickstart-4tgogd)
//   `

//   getAst = (ast: any) => {
//     console.log(ast)
//   }

//   Body() {
//     MarkitView(this.testMDString)
//       .getAst(this.getAst)
//   }
// }

// console.log(renderToString(TestView))

export default TestView
function Prop(target: JJ, propertyKey: "qushifafe"): void {
  throw new Error("Function not implemented.")
}
