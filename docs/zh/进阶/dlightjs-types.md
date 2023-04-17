# @dlightjs/types

更好ts使用体验

* 对于html node，从@dlightjs/types中引入会自动补全可选的property/event/style
* 对于custom node，使用前有三步

  
  1. 定义参数的interface `MyCompProps`
  2. `class MyComp extends implements MyCompProps `
  3. 使用前包一层 `Types<MyCompProps>(MyComp)`
  * 这样就可以自动补全所有的参数，以及显示jsdoc
  * 注意点：在外面调用必须先调用必选参数，再调用可选参数，不然会报错，这样是为了规范必选参数一定要填

```typescript
import { View } from "@dlightjs/dlight"
import Types, { button, div, Prop, required, State } from "@dlightjs/types"
import { i18n } from "@butlex/i18n"

interface CounterProp {
  title: string
  /**
   * @jsdoc 这样外面也能直接看见了
   */
  defaultCount?: number
}

class Counter extends View implements CounterProp {
    @Prop title = required
    @Prop defaultCount = 1
    @State count = this.defaultCount
    Body() {
      div(this.title)
      div(this.count)
      button(i18n`点击我`)
        .onclick(() => {
          this.count ++
        })
    }
}

export default Types<CounterProp>(Counter)

```


