# @dlightjs/decorators

自定义decorators

# @Await

异步函数

```typescript
import {Await} from "@dlightjs/decorators"

async function sleep(ms: number) {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

async function ok(count) {
  await sleep(1000)
  return count
}

export class TestTest extends View {
  @State count = 0
  @State @Await awaitedCount: number = ok(this.count)
  
  Body() {
    div(this.awaitedCount)
    button()
      .onclick(() => {
        this.count ++
      })
    }
}

```

@Await也可以填写在await时候的默认值

```typescript
import {Await} from "@dlightjs/decorators"

async function sleep(ms: number) {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

async function ok(count) {
  await sleep(1000)
  return count
}

export class TestTest extends View {
  @State count = 0
  @State @Await("defaultValue") awaitedCount: number = ok(this.count)
  
  Body() {
    div(this.awaitedCount)
    button()
      .onclick(() => {
        this.count ++
      })
    }
}
```

上面的例子，逻辑是

`count`改变 → `awaitedCount`感知到，调用`ok(this.count)` → @Await 感知到返回是个Promise，为其添加`.then(value => this.awaitedCount = value)`  → Promise执行到 .then，设置 `this.awaitedCount` →   `this.awaitedCount`是State，引起view的变化