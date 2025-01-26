<p align="center">
  <img src="./docs/imgs/logo_title.png" style="display: block; margin: auto; width: 50%;" />
</p>

<p align="center">
  <a href="https://github.com/iandxssxx" target="_black">
    <img src="https://img.shields.io/badge/Author-IanDxSSXX-a046c2.svg?&logo=github" alt="author" />
  </a>
  <a href="https://github.com/dlight-js/dlight/stargazers" target="_black">
    <img src="https://img.shields.io/github/stars/dlight-js/dlight?logo=github" alt="stars" />
  </a>
  <a href="https://cdn.jsdelivr.net/npm/@dlightjs/dlight" target="_black">
    <img src="https://img.shields.io/bundlephobia/minzip/@dlightjs/dlight.svg?label=Size&logo=javascript&color=0ec946" alt="Size" />
  </a>
  <a href="https://github.com/dlight-js/dlight/blob/master/LICENSE" target="_black">
    <img src="https://img.shields.io/github/license/dlight-js/dlight?color=2DCE89&logo=github" alt="license" />
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@dlightjs/dlight" target="_black">
    <img src="https://img.shields.io/npm/dm/@dlightjs/dlight?color=b8072b&logo=npm" alt="downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@dlightjs/dlight" target="_black">
    <img src="https://img.shields.io/npm/v/@dlightjs/dlight?logo=npm&label=core" alt="version" />
  </a>
  <a href="https://www.npmjs.com/package/babel-preset-dlight" target="_black">
    <img src="https://img.shields.io/npm/v/babel-preset-dlight?logo=npm&label=transpiler" alt="version" />
  </a>
</p>

# [dlight.dev](https://dlight.dev)

DX-first UI rendering library.

- 🥳 **Delightful**
  - With an API designed to be intuitive and user-friendly, web development becomes effortless with DLight, whether you're building a simple website or a complex web application.
- 🚀 **Performant**
  - With a minuscule file size of just 5KB, DLight is lightning-fast and ultra-lightweight, delivering optimal performance without the need for manual optimization.
- ✨ **DX-first**
  - DLight uses the syntax of function calls and dot notation to make development more enjoyable, without the need to write outdated and hard-to-read XML code.
- 🪶 **Intuitively Simple**
  - DLight is born reactive and is designed to be intuitively simple, with a minimalistic API that requires no memorization of complex functions or libraries.

# Preview

```js
import { View } from "@dlightjs/dlight"

@View
class MyComp {
  night = false
  fruits = ["🍎", "🍊", "🥑"]

  Body() {
    h1("hello, dlight js")

    for (const fruit of this.fruits) {
      div(fruit)
    }

    button("toggle")
      .class("toggle")
      .onClick(() => {
        this.night = !this.night
      })

    if (this.night) {
      "🌙"
      "✨"
      "🌟"
    } else {
      "🔆"
    }
  }
}


```


# Credits
Thanks all existing frameworks for the inspiration and the great work they've done. DLight is standing on the shoulders of giants.
* [SwiftUI](https://developer.apple.com/xcode/swiftui/)
* [React](https://react.dev/)
* [Vue](https://vuejs.org/)
* [Svelte](https://svelte.dev/)
* [Solid](https://solidjs.com/)
* [Angular](https://angular.dev/)
* [Preact](https://preactjs.com/)
* [Qwik](https://qwik.builder.io/)
* [Ember](https://emberjs.com/)
* [Marko](https://markojs.com/)
* [VanJs](https://vanjs.org/)
* [ef.js](https://ef.js.org/)
* [Lit](https://lit.dev/)

Thanks [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark) for the benchmarking tooling that pulls my hair out.

Thanks [component party](https://component-party.dev/#context) for the syntax level comparison between different frameworks.


# Contributors
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/IanDxSSXX"><img src="https://avatars.githubusercontent.com/u/69476139?v=4?s=100" width="100px;" alt="Duan Yihan"/><br /><sub><b>Duan Yihan</b></sub></a><br /><a href="#infra-IanDxSSXX" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/dlight-js/dlight/commits?author=IanDxSSXX" title="Tests">⚠️</a> <a href="https://github.com/dlight-js/dlight/commits?author=IanDxSSXX" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/orange04"><img src="https://avatars.githubusercontent.com/u/47129477?v=4?s=100" width="100px;" alt="orange04"/><br /><sub><b>orange04</b></sub></a><br /><a href="https://github.com/dlight-js/dlight/commits?author=orange04" title="Code">💻</a> <a href="#design-orange04" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Guo-lab"><img src="https://avatars.githubusercontent.com/u/74242889?v=4?s=100" width="100px;" alt="Guo-lab"/><br /><sub><b>Guo-lab</b></sub></a><br /><a href="#content-Guo-lab" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/scythewyvern"><img src="https://avatars.githubusercontent.com/u/98530570?v=4?s=100" width="100px;" alt="Gor"/><br /><sub><b>Gor</b></sub></a><br /><a href="https://github.com/dlight-js/dlight/commits?author=scythewyvern" title="Code">💻</a> <a href="https://github.com/dlight-js/dlight/issues?q=author%3Ascythewyvern" title="Bug reports">🐛</a> <a href="#example-scythewyvern" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ZhengHeber"><img src="https://avatars.githubusercontent.com/u/77974962?v=4?s=100" width="100px;" alt="Haibo Zheng"/><br /><sub><b>Haibo Zheng</b></sub></a><br /><a href="https://github.com/dlight-js/dlight/issues?q=author%3AZhengHeber" title="Bug reports">🐛</a> <a href="#content-ZhengHeber" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.relm.us"><img src="https://avatars.githubusercontent.com/u/129?v=4?s=100" width="100px;" alt="Duane Johnson"/><br /><sub><b>Duane Johnson</b></sub></a><br /><a href="https://github.com/dlight-js/dlight/commits?author=canadaduane" title="Code">💻</a> <a href="#ideas-canadaduane" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/dlight-js/dlight/commits?author=canadaduane" title="Documentation">📖</a> <a href="#maintenance-canadaduane" title="Maintenance">🚧</a></td>
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
