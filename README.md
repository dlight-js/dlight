# 🧬 DLight.js

Your modern and elegant web framework ~

* ⚡️ Performant
  * Dlight enhances code performance at compile time by directly manipulating the DOM, which makes the execution speed of the code as close to vanilla JavaScript as possible, even with limited optimization knowledge.
* Light
  * DLight is only 12KB.
* 🚲 Simple
  * No more complex hooks towards reactivity. Just use @State, and dep-chain will help you do the rest.
  * Dlight provides context managing power by default.
* 🍼 Friendly
  * Support jsx and jsd(our new domain syntax) to help you write everything in js.
* 🦋 Beautiful
  * Every line of code in DLight is elegant and beautiful!

# Preview

A simple counter with both jsx and jsd, choose it as you like!

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

# Documentation

* [dlight-README.md](./packages/@dlightjs/dlight/README.md)

* website-doc(building with DLight now👨🏻‍💻)

# Homepage

Building with DLight now👨🏻‍💻

# Performance

## Test records

| Test time | Environment                                                                  | Test info                                    | DLight.js version |
| --------- | ---------------------------------------------------------------------------- | -------------------------------------------- | ----------------- |
| 1/26/2023 | MacBook Air (M1, 2020) - 16G - macOS Monterey 12.4<br />Chrome 109.0.5414.87 | Warm ups: 5<br />Run: 5<br />Result: average | 0.1.1             |

## Test results

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

## Result analysis

1. Creat & update rows
   
   Really really really weird, but with 20 tries, DLight is always faster than vanilla js. The vanilla code is downloaded right from js-benchmark's GitHub repo and there's nothing wrong with it as far as I know....
   
   If you're interested in this, just download the file that I describe in the tutorial part and test for yourself.

2. Highlight a selected row & Remove one row
   
   The origin implementation of vanilla js makes the clicking area too small or even not exsiting. I don't want to change their code so I've just skipped testing them.

# TODO

## Features

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

## Component

* [x] V/H/ZStack/Spacer

* [x] Switch-Case

* [x] Animation
  
  * [x] Transition
  * [x] TransitionGroup
- [x] Route

## Plugin

- [x] vite transpiler plugin

- [ ] ❗️babel class.this elimination plugin

- [ ] node transplier without vite support

- [ ] ❗️vscode language server for auto completion

## Doc

- [x] in chinese

- [x] docs

- [x] tutorials

- [ ] advanced docs

- [ ] web homepage

- [ ] video tutorials
