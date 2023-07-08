<img src="./docs/imgs/logo_title.png" style="display:block; margin: auto; width: 50%;"/>

> Core Packages\
[![dlight](https://badgen.net/npm/v/@dlightjs/dlight?label=@dlightjs/dlight)](https://www.npmjs.com/package/@dlightjs/dlight)
[![babel-plugin-dlight](https://badgen.net/npm/v/babel-plugin-dlight?label=babel-plugin-dlight)](https://www.npmjs.com/package/https://badgen.net/npm/v/babel-plugin-dlight?label=babel-plugin-dlight)
[![babel-preset-dlight](https://badgen.net/npm/v/babel-preset-dlight?label=babel-preset-dlight)](https://www.npmjs.com/package/https://badgen.net/npm/v/babel-preset-dlight?label=babel-preset-dlight)
[![vite-plugin-dlight](https://badgen.net/npm/v/vite-plugin-dlight?label=vite-plugin-dlight)](https://www.npmjs.com/package/https://badgen.net/npm/v/vite-plugin-dlight?label=vite-plugin-dlight)
[![@dlightjs/types](https://badgen.net/npm/v/@dlightjs/types?label=@dlightjs/types)](https://www.npmjs.com/package/@dlightjs/types)
[![create-dlightjs](https://badgen.net/npm/v/create-dlightjs?label=create-dlightjs)](https://www.npmjs.com/package/https://badgen.net/npm/v/create-dlightjs?label=create-dlightjs)

> Ecosystem\
[![transpiler](https://badgen.net/npm/v/@dlightjs/transpiler?label=@dlightjs/transpiler)](https://www.npmjs.com/package/@dlightjs/transpiler)
[![transpiler-standalone](https://badgen.net/npm/v/@dlightjs/transpiler-standalone?label=@dlightjs/transpiler-standalone)](https://www.npmjs.com/package/@dlightjs/transpiler-standalone)
[![components](https://badgen.net/npm/v/@dlightjs/components?label=@dlightjs/components)](https://www.npmjs.com/package/@dlightjs/components)
[![material-icons](https://badgen.net/npm/v/@dlightjs/material-icons?label=@dlightjs/material-icons)](https://www.npmjs.com/package/@dlightjs/material-icons)
[![emotion](https://badgen.net/npm/v/@dlightjs/emotion?label=@dlightjs/emotion)](https://www.npmjs.com/package/@dlightjs/emotion)


Your modern UI rendering library ~

* 🥳 Delightful
  * With an API designed to be intuitive and user-friendly, web development becomes effortless with Dlight, whether you're building a simple website or a complex web application.Dlight enhances code performance at compile time and directly manipulates the DOM, which makes the execution speed of the code as close to vanilla JavaScript as possible, even with limited optimization knowledge.
* 🚀 Performant
  * With a minuscule file size of just 4KB, Dlight is lightning-fast and ultra-lightweight, delivering optimal performance without the need for manual optimization.
* ✨ Modern
  * Dlight uses the syntax of function calls and dot notation to make development more enjoyable, without the need to write outdated and hard-to-read XML code.
* 🪶 Intuitively Simple
  * Dlight is born reactive and is designed to be intuitively simple, with a minimalistic API that requires no memorization of complex functions or libraries.

# Preview

```js
import { View } from "@dlightjs/dlight"

export class MyComp extends View {
  count = 0  
  toggle = true

  Body() {
    h1("hello, dlight js")
    button("toggle")
      .onclick(() => {
        this.toggle = !this.toggle
      })
    if (this.count) {
      "simple text"
    } else {
      div("div with color")
        ._color("red")
    }
  }
}
```
# Documentation
[README-dlight.md](./packages/core/%40dlightjs/dlight/README.md) (WIP)
# Homepage

Building with DLight now👨🏻‍💻
