# Nodes

# HTML

```typescript
...
Body() {
  div("inner text")
  div() 
  {
    div("child")
      .id("div-child-1") 
  }
}
...
```

# Custom

```typescript
...
Body() {
  MyComp()
    .param1("what")
    .param2("heck")
}
...
```

# Text

```typescript
...
Body() {
  "plain text node1"
  'plain text node2'
  `this is a text node too, with ${this.anyMessage}`
}
...
```

# If

```typescript
...
Body() {
  if (this.show) {
    div("show me")
  } else if (this.alsoShow) {
    button("also show me")
  } else {
    span("don't show me")
  }
}
...
```

# For

```typescript
...
Body() {
  for (let item of this.array) {
    div(item)
  }
}
...
```

只要是 `for (let xxx of xxx) {}` 的写法都支持，比如：

```typescript
...
Body() {
  for (let [key, item] of this.array.entries()) {
    div(`key: ${key}`)
    div(item)
  }
}
...
```

也可以添加key，这样更新就是对于指定key而言

```typescript
...
Body() {
  for (let [key, item] of this.array.entries()) { [key]
    div(`key: ${key}`)
    div(item)
  }
}
...
```

# Env

Dlight中的Context/环境变量

* Env的底层原理和DLight中传递参数是一样的，所以**没有额外开销**
* 使用 @Env 来在自定义组件中使用

```typescript
import {View} from "@dlightjs/dlight"
import {Env, env} from "@dlightjs/types"

class MyNestComp extends View {
  @Env myMessage = "default value"
  Body() {
    div(this.myMessage)  // will show "use me anywhere inside this environment"
  }
}

class MySubComp2 extends View {
  @Env myMessage = "default value"
  Body() {
    div(this.myMessage)  // will show "use me anywhere inside this environment"
  }
}

class MySubComp1 extends View {
  @Env myMessage = "default value"
  Body() {
    MyNestComp()  // call MySubComp2
    div(this.myMessage)  // will show "use me anywhere inside this environment"
  }
}

export class MyComp extends View {  
  Body() {
    env()
      .myMessage("use me anywhere inside this environment")
    {
      MySubComp1()
      MySubComp2()
    }
  }
}
```

## 