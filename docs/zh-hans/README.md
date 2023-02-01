# 🧬 DLight.js

你的现代化前端框架 ～

* ⚡️ 快
  * DLight 通过直接操纵 DOM 来在编译阶段增强代码性能，这使得代码的执行速度无限接近纯 JavaScript ，即使在优化知识有限的情况下也是如此。
* 🪶 轻量
  * DLight包大小只有12KB。
* 🚲 简单
  * 不再需要记忆各种复杂的hooks。只需要使用 @State, dep-chain就会帮你完成剩下的工作。
  * DLight原生提供Context管理功能。
* 🍼 友好
  * 支持jsx and jsd(我们提供的新语法) 来帮助你wirte everything in js。
* 🦋 好看
  * 每一行DLight的代码都很优雅！

# 预览

同时使用jsx和jsd的计数器

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

- [dlight-README.md](./packages/@dlightjs/dlight/README.md)

- website-doc(目前正在用DLight构建👨🏻‍💻)

# 首页

正在使用DLight构建中👨🏻‍💻

# 性能

## 测试记录

| 测试时间      | 环境                                                                         | 测试信息                      | DLight.js 版本 |
| --------- | -------------------------------------------------------------------------- | ------------------------- | ------------ |
| 1/26/2023 | MacBook Air (M1, 2020) - 16G - macOS Monterey 12.4<br>Chrome 109.0.5414.87 | 热启动: 5<br>运行: 5<br>结果: 均值 | 0.1.1        |

## 测试结果

|                                        | Vanilla JS (ms) | DLight (ms) | Times (x) |
| -------------------------------------- | --------------- | ----------- | --------- |
| Creat 1,000 rows                       | 40.64           | 33.40       | 0.82      |
| Update all 1,000 rows                  | 31.33           | 28.32       | 0.90      |
| Update every 10th row for 1,000 rows   | 16.01           | 14.58       | 0.91      |
| Highlight a selected row               | \               | \           | \         |
| Swap 2 rows for table with 1,000 rows  | 7.01            | 6.24        | 0.89      |
| Remove one row                         | \               | \           | \         |
| Create 10,000 rows                     | 385.17          | 356.03      | 0.92      |
| Append 1,000 to a table of 10,000 rows | 88.35           | 74.97       | 0.85      |
| Clear a table with 1,000 rows          | 12.65           | 12.82       | 1.01      |

## 结果分析

1. 新建 & 更新行
   
   非常非常非常奇怪，但是试了20多次，DLIght还是比原生js快。原生代码是直接从js-benchmark's GitHub 的repo下下来的并且它的代码也没有任何问题。。。
   
   如果你对这个结果很感兴趣，可以下载我在教程段落提到的文件并且自己测试一下。

2. 高亮一个选中行 & 删除一行
   
   原生js的实现让这个点击区域很小甚至没有。我不想改他的代码所以直接跳过测试它们了。

# TODO

## 特性

- [x] jsd transpiler
- [x] if
- [x] for
- [x] state
- [x] derived
- [x] effect
- [x] prop
- [x] dot prop
- [x] shortcut for style (e.g. div("hello")._height)
- [x] element map out
- [x] support text node
- [x] support jsx
- [x] jsx control flow
- [x] lifecycle as prop
- [x] support environment/context
- [x] support prop expression nesting
- [ ] ❗️error hints
- [x] deps optimization
- [x] PropState/EnvState
- [x] add lifecycle to htmlNode
- [ ] concurrent mode
- [ ] CLI
- [ ] ❗️dependencies optimization
  - [ ] drop dependencies when set state
  - [ ] drop dependencies if it's parent node is set state and left is the same identifier


## 组件

- [x] V/H/ZStack/Spacer

- [x] Switch-Case

- [x] Animation
  
  - [x] Transition
  - [x] TransitionGroup

- [x] Route

## 插件

- [x] vite transpiler plugin

- [ ] ❗️babel class.this elimination plugin

- [ ] node transplier without vite support

- [ ] ❗️vscode language server for auto completion

## 文档

- [x] in chinese

- [x] docs

- [x] tutorials

- [ ] advanced docs

- [ ] web homepage

- [ ] video tutorials
