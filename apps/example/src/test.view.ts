import { View, renderToString } from "@dlightjs/dlight"
import { div } from "@dlightjs/easy-css"
import { button, htmlTag } from "@dlightjs/types"
import { HStack } from "@dlightjs/components"

function deepCopyOnChange(target: any, key: string) {
  const value = target[key]
  console.log(Object.getOwnPropertyNames(target), target.list, value)

  // const getter = function() {
  //   console.log("jj")
  //   return value
  // }

  // const setter = function(newVal: any) {
  //   value = newVal
  //   console.log(value)
  //   target[key] = deepCopy(value)
  // }
  // if (delete target[key]) {
  // Object.defineProperty(target, key, {
  //   get: getter,
  //   set: setter,
  //   enumerable: true,
  //   configurable: true
  // })
  // }
  Object.defineProperty(target.constructor, key, {
    value: (() => {
      console.log("jj")
      return [9, 10, 11]
    })()
  })

  // function deepCopy(obj: any): any {
  //   if (Array.isArray(obj)) {
  //     return obj.map((item) => deepCopy(item))
  //   } else if (typeof obj === "object" && obj !== null) {
  //     const copiedObj: Record<string, any> = {}
  //     for (const [prop, val] of Object.entries(obj)) {
  //       copiedObj[prop] = deepCopy(val)
  //     }
  //     return copiedObj
  //   } else {
  //     return obj
  //   }
  // }
}

class JJ {
  @deepCopyOnChange
    hh = { jj: true }
}
const a = new JJ()
console.log(a.hh)

class TestView extends View {
  list = (() => {
    return [1, 2, 3]
  })()

  Body() {
    for (const a of this.list) {
      div(a)
    }
    button("+")
      .onclick(() => {
        this.list.push(this.list.length + 1)
      })
  }
}

export default TestView
