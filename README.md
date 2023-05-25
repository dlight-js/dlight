<img src="./docs/imgs/logo_title.png" style="display:block; margin: auto; width: 50%;"/>

[![dlight](https://badgen.net/npm/v/@dlightjs/dlight?label=@dlightjs/dlight)](https://www.npmjs.com/package/@dlightjs/dlight)
[![transpiler](https://badgen.net/npm/v/@dlightjs/transpiler?label=@dlightjs/transpiler)](https://www.npmjs.com/package/@dlightjs/transpiler)
[![components](https://badgen.net/npm/v/@dlightjs/components?label=@dlightjs/components)](https://www.npmjs.com/package/@dlightjs/components)
[![vite-plugin-dlight-transpiler](https://badgen.net/npm/v/vite-plugin-dlight-transpiler?label=vite-plugin-dlight-transpiler)](https://www.npmjs.com/package/https://badgen.net/npm/v/vite-plugin-dlight-transpiler?label=vite-plugin-dlight-transpiler)
[![babel-plugin-optional-this](https://badgen.net/npm/v/babel-plugin-optional-this?label=babel-plugin-optional-this)](https://www.npmjs.com/package/babel-plugin-optional-this)
[![@dlightjs/types](https://badgen.net/npm/v/@dlightjs/types?label=@dlightjs/types)](https://www.npmjs.com/package/@dlightjs/types)

EN | [中文](./docs/zh/README.md)

Your modern web framework ~

* ⚡️ Performant
  * Dlight enhances code performance at compile time and directly manipulates the DOM, which makes the execution speed of the code as close to vanilla JavaScript as possible, even with limited optimization knowledge.
* 🚲 Simple
  * No more complex hooks towards reactivity. Just use @State, and dep-chain will help you do the rest.
  * Dlight provides context managing power by default.
  * Website development has never been so easy.
* 🍼 Friendly
  * Support jsx and jsd(our new domain syntax) to help you write everything in js.
* 🦋 Beautiful
  * Every line of code in DLight is elegant and beautiful!

# Preview
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

(Upgrading dlight version..👨🏻‍💻 Better support with [chinese documentation](./docs/zh/README.md) now)
* [README-dlight.md](./packages/@dlightjs/dlight/README.md)
* [README-components.md](./packages/@dlightjs/components/README.md)
* website-doc(building with DLight now👨🏻‍💻)

# Tutorial

* TODO app
  * [jsx-codesandbox](https://codesandbox.io/p/sandbox/dlight-todoapp-jsx-42t284)
  * [jsd-codesandbox](https://codesandbox.io/p/sandbox/dlight-todoapp-jsd-i8se5e)


# Homepage

Building with DLight now👨🏻‍💻

# TODO

[TODO.md](./docs/TODO.md)./docs/TODO.md)
