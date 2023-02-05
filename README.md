<img src="./docs/imgs/logo_title.png" style="display:block; margin: auto; width: 50%;"/>

[![dlight](https://badgen.net/npm/v/@dlightjs/dlight?label=@dlightjs/dlight)](https://www.npmjs.com/package/@dlightjs/dlight)
[![transpiler](https://badgen.net/npm/v/@dlightjs/transpiler?label=@dlightjs/transpiler)](https://www.npmjs.com/package/@dlightjs/transpiler)
[![components](https://badgen.net/npm/v/@dlightjs/components?label=@dlightjs/components)](https://www.npmjs.com/package/@dlightjs/components)
[![vite-plugin-dlight-transpiler](https://badgen.net/npm/v/vite-plugin-dlight-transpiler?label=vite-plugin-dlight-transpiler)](https://www.npmjs.com/package/https://badgen.net/npm/v/vite-plugin-dlight-transpiler?label=vite-plugin-dlight-transpiler)

EN | [中文](./docs/zh/README.md)

Your modern web framework ~

* ⚡️ Performant
  * Dlight enhances code performance at compile time and directly manipulates the DOM, which makes the execution speed of the code as close to vanilla JavaScript as possible, even with limited optimization knowledge.
* 🪶 Light
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

Play around in [codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-quickstart-4tgogd).

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

* [README-dlight.md](./packages/@dlightjs/dlight/README.md)
* website-doc(building with DLight now👨🏻‍💻)

# Tutorial
* [TODO app](https://codesandbox.io/p/sandbox/dlight-todoapp-jsx-42t284)


# Homepage

Building with DLight now👨🏻‍💻

# TODO

[TODO.md](./docs/TODO.md)
