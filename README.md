<p align="center">
  <img src="./docs/imgs/logo_title.png" style="display:block; margin: auto; width: 50%;"/>
</p>
<p align="center">
  <a href="https://github.com/iandxssxx" target="_black">
    <img src="https://img.shields.io/badge/Author-%20IanDxSSXX%20-a046c2.svg?&logo=github" alt="author" />
  </a>
  <a href="https://www.github.com/dlight-js/dlight/stargazers" target="_black">
    <img src="https://img.shields.io/github/stars/dlight-js/dlight?logo=github" alt="stars" />
  </a>
  <a href="https://cdn.jsdelivr.net/npm/@dlightjs/dlight"><img src="https://img.shields.io/bundlephobia/minzip/@dlightjs/dlight.svg?label=Size&logo=javascript&color=0ec946" alt="Size"></a>
  <a href="https://www.github.com/dlight-js/dlight/blob/master/LICENSE" target="_black">
    <img src="https://img.shields.io/github/license/dlight-js/dlight?color=%232DCE89&logo=github" alt="license" />
  </a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@dlightjs/dlight" target="_black">
    <img src="https://img.shields.io/npm/dm/@dlightjs/dlight?color=%23b8072b&logo=npm" alt="downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@dlightjs/dlight" target="_black">
    <img src="https://img.shields.io/npm/v/@dlightjs/dlight?logo=npm&label=core" alt="version" />
  </a>
  <a href="https://www.npmjs.com/package/babel-preset-dlight" target="_black">
    <img src="https://img.shields.io/npm/v/babel-preset-dlight?logo=npm&label=transpiler" alt="version" />
  </a>
</p>


DX-first UI rendering library.

* 🥳 Delightful
  * With an API designed to be intuitive and user-friendly, web development becomes effortless with Dlight, whether you're building a simple website or a complex web application.Dlight enhances code performance at compile time and directly manipulates the DOM, which makes the execution speed of the code as close to vanilla JavaScript as possible, even with limited optimization knowledge.
* 🚀 Performant
  * With a minuscule file size of just 4KB, Dlight is lightning-fast and ultra-lightweight, delivering optimal performance without the need for manual optimization.
* ✨ DX-first
  * Dlight uses the syntax of function calls and dot notation to make development more enjoyable, without the need to write outdated and hard-to-read XML code.
* 🪶 Intuitively Simple
  * Dlight is born reactive and is designed to be intuitively simple, with a minimalistic API that requires no memorization of complex functions or libraries.

# Preview

```js
import { View } from "@dlightjs/dlight"

@View
class MyComp {
  atNight = false
  fruits = ["🍎", "🍊", "🥑"]

  Body() {
    h1("hello, dlight js")
    button("toggle")
      .className("toggle")
      .onclick(() => {
        this.atNight = !this.atNight
      })

    if (this.atNight) {
      "🌘"
    } else {
      "🔆"
    }

    for (const fruit of this.fruits) {
      div(fruit)
    }
  }
}
```

# Documentation
[README-dlight.md](./packages/core/dlight/README.md) 
# Homepage

Available at [dlight-js](https://dlight-js.com) but still under development with DLight now👨🏻‍💻


# Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/IanDxSSXX"><img src="https://avatars.githubusercontent.com/u/69476139?v=4?s=100" width="100px;" alt="Duan Yihan"/><br /><sub><b>Duan Yihan</b></sub></a><br /><a href="#infra-IanDxSSXX" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/dlight-js/dlight/commits?author=IanDxSSXX" title="Tests">⚠️</a> <a href="https://github.com/dlight-js/dlight/commits?author=IanDxSSXX" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/orange04"><img src="https://avatars.githubusercontent.com/u/47129477?v=4?s=100" width="100px;" alt="orange04"/><br /><sub><b>orange04</b></sub></a><br /><a href="https://github.com/dlight-js/dlight/commits?author=orange04" title="Code">💻</a> <a href="#design-orange04" title="Design">🎨</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
