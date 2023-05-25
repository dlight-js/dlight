<img src="../imgs/logo_title.png" style="display:block; margin: auto; width: 50%;"/>

[![dlight](https://badgen.net/npm/v/@dlightjs/dlight?label=@dlightjs/dlight)](https://www.npmjs.com/package/@dlightjs/dlight)
[![transpiler](https://badgen.net/npm/v/@dlightjs/transpiler?label=@dlightjs/transpiler)](https://www.npmjs.com/package/@dlightjs/transpiler)
[![components](https://badgen.net/npm/v/@dlightjs/components?label=@dlightjs/components)](https://www.npmjs.com/package/@dlightjs/components)
[![vite-plugin-dlight-transpiler](https://badgen.net/npm/v/vite-plugin-dlight-transpiler?label=vite-plugin-dlight-transpiler)](https://www.npmjs.com/package/https://badgen.net/npm/v/vite-plugin-dlight-transpiler?label=vite-plugin-dlight-transpiler)

[EN](../../README.md) | 中文

你的现代化前端框架 ～

* ⚡️ 快
  * DLight 通过直接操纵 DOM 来在编译阶段增强代码性能，这使得代码的执行速度接近纯 JavaScript ，即使在优化知识有限的情况下也是如此。
  * 更新state的性能是1.03倍的原生JS！
* 🚲 简单
  * 不再需要记忆各种复杂的hooks。只需要使用 @State, dep-chain就会帮你完成剩下的工作。
  * DLight原生提供Context管理功能。
  * 网页开发从来没有如此简单。
* 🍼 友好
  * 支持jsx and jsd(我们提供的新语法) 来帮助你wirte everything in js。
  * Jsd是一个类似swiftui的语法，对iOS开发者非常友好。
* 🦋 好看
  * 每一行DLight的代码都很优雅！

# 预览

同时使用jsx和jsd的计数器。

在 [codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-quickstart-4tgogd) 中尝试。

## DLight.jsx

```jsx
// -> ./MyComp.jsx
import {View} from "@dlightjs/dlight"

export class MyComp extends View {
  @State count = 0  
  countPlus1 = this.count + 1 

  Body = (
    <>
      <h1>hello, dlight js, jsx</h1>
      <div> {this.count} </div>
      <div> {this.countPlus1} </div>
      <button onclick={() => {this.count++}}>
        +
      </button>
      <button onclick={() => {this.count--}}>
        -
      </button>
    </>
  )
}
```

## DLight.jsd

```js
// -> ./MyComp.jsd
import {View} from "@dlightjs/dlight"

export class MyComp extends View {
  @State count = 0  
  countPlus1 = this.count + 1  

  Body() {
    h1("hello, dlight js, jsd")
    div(this.count)
    div(this.countPlus1)
    button("+")
      .onclick(() => {
        this.count ++
      })
    button("-")
      .onclick(() => {
        this.count --
      })
  }
}
```

# 文档

- [README-dlight.md](./README-dlight-jsd.md)

- website-doc(目前正在用DLight构建👨🏻‍💻)


# 教程

* [TODO app](https://codesandbox.io/p/sandbox/dlight-todoapp-jsx-42t284)


# 首页

正在使用DLight构建中👨🏻‍💻
# TODO

[TODO.md](../TODO.md)
<img src="../imgs/logo_title.png" style="display:block; margin: auto; width: 50%;"/>

[![dlight](https://badgen.net/npm/v/@dlightjs/dlight?label=@dlightjs/dlight)](https://www.npmjs.com/package/@dlightjs/dlight)
[![transpiler](https://badgen.net/npm/v/@dlightjs/transpiler?label=@dlightjs/transpiler)](https://www.npmjs.com/package/@dlightjs/transpiler)
[![components](https://badgen.net/npm/v/@dlightjs/components?label=@dlightjs/components)](https://www.npmjs.com/package/@dlightjs/components)
[![vite-plugin-dlight-transpiler](https://badgen.net/npm/v/vite-plugin-dlight-transpiler?label=vite-plugin-dlight-transpiler)](https://www.npmjs.com/package/https://badgen.net/npm/v/vite-plugin-dlight-transpiler?label=vite-plugin-dlight-transpiler)

[EN](../../README.md) | 中文

你的现代化前端框架 ～

* ⚡️ 快
  * DLight 通过直接操纵 DOM 来在编译阶段增强代码性能，这使得代码的执行速度接近纯 JavaScript ，即使在优化知识有限的情况下也是如此。
  * 更新state的性能是1.03倍的原生JS！
* 🚲 简单
  * 不再需要记忆各种复杂的hooks。只需要使用 @State, dep-chain就会帮你完成剩下的工作。
  * DLight原生提供Context管理功能。
  * 网页开发从来没有如此简单。
* 🍼 友好
  * 支持jsx and jsd(我们提供的新语法) 来帮助你wirte everything in js。
  * Jsd是一个类似swiftui的语法，对iOS开发者非常友好。
* 🦋 好看
  * 每一行DLight的代码都很优雅！

# 预览

同时使用jsx和jsd的计数器。

在 [codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-quickstart-4tgogd) 中尝试。

## DLight.jsx

```jsx
// -> ./MyComp.jsx
import {View} from "@dlightjs/dlight"

export class MyComp extends View {
  @State count = 0  
  countPlus1 = this.count + 1 

  Body = (
    <>
      <h1>hello, dlight js, jsx</h1>
      <div> {this.count} </div>
      <div> {this.countPlus1} </div>
      <button onclick={() => {this.count++}}>
        +
      </button>
      <button onclick={() => {this.count--}}>
        -
      </button>
    </>
  )
}
```

## DLight.jsd

```js
// -> ./MyComp.jsd
import {View} from "@dlightjs/dlight"

export class MyComp extends View {
  @State count = 0  
  countPlus1 = this.count + 1  

  Body() {
    h1("hello, dlight js, jsd")
    div(this.count)
    div(this.countPlus1)
    button("+")
      .onclick(() => {
        this.count ++
      })
    button("-")
      .onclick(() => {
        this.count --
      })
  }
}
```

# 文档

- [README-dlight.md](./README-dlight-jsd.md)

- website-doc(目前正在用DLight构建👨🏻‍💻)


# 教程

* [TODO app](https://codesandbox.io/p/sandbox/dlight-todoapp-jsx-42t284)


# 首页

正在使用DLight构建中👨🏻‍💻
# TODO

[TODO.md](../TODO.md)
