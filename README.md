# 🧬 DLight.js

# Introduction

DLight.js is a gooooood web framework!

DLight uses [vite](https://vitejs.dev/) to construct its apps. We mainly use this vite plugin-`vite-plugin-dlight-transpiler` to transpile jsx/jsd file to pure js code.

# Quick start

1. Use CLI to build dlight app. (This feature is still in development.)

``` shell
npm install -g @dlightjs/cli
create-dlight
```

2. Clone this repo https://github.com/dlight-js/dlight-vite-template for a quick start.
3. 🌟 Play around in this [codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-template-4tgogd?file=%2Fsrc%2FMyComp.jsd&selection=%5B%7B%22endColumn%22%3A22%2C%22endLineNumber%22%3A15%2C%22startColumn%22%3A22%2C%22startLineNumber%22%3A15%7D%5D)

## Render

Mount your dlight component to any html element with id.

```typescript
import {render} from "@dlightjs/dlight"
import {MyComp} from "./MyComp.jsx"

render("app", new MyComp())
```

## Write your own component 

First thing first, DLight is not using template/functional components. It uses Class component instead, but not like React Class component. There're two ways to write a component.

1. Your familiar `.jsx` file

```jsx
// -> ./MyComp.jsx
import {View} from "@dlightjs/dlight"

export class MyComp extends View {
  @State count = 0  // use @State to make the class member "count" reactive
  countPlus1 = this.count + 1  // "countPlus1" will automatically be reactive because it's derived from "count"

  // all the prop are DOM properties, so we use onclick instead of onClick
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
  );
}


```

2. Our new `.jsd` file

   We create a new domain syntax in `(class xx extends View).Body`. It is pretty similar to SwiftUI syntax. We will walk you through in the next section. Here's an example with the same output of the previous `.jsx` file.

```js
// -> ./MyComp.jsd
import {View} from "@dlightjs/dlight"

export class MyComp extends View {
  @State count = 0  
  countPlus1 = this.count + 1  

  Body() {
  	h1("hello, dlight js, jsd")
  	div(this.count)
    div(this.count + 1)
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



# Features

## Loop

## Condition



# Performance

* 5 warm-ups, mean results of 10 times, will re-calc soon, currently approximately 1.01x vanilla js (but require more memory).

# Core Concept

# Design Proposal

## tsd

```typescript
Body() {
  div(props) {
    SubComp()
  }	
  	.dotProps("any")
  "string"
  `string ${anyVariable}`
  {{ anyVariable === 1 ? "is 1" : "not 1" }}
  {{ anyVariable === 1 ? {{ div(1) }} : {{ div(2) }} }}  
}
```

# TODO

* features
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
- [x] prop lifecycle
- [x] support environment/context
- [ ] support prop expression nesting
- [x] animation
- [ ] error hints
- [x] deps optimization
- [ ] PropState change to PropState/EnvState
- [x] add lifeCycle to htmlNode

* plugins
- [x] vite transpiler plugin
- [ ] vscode language server for auto completion



