# Introduction

DLight.js is a gooooood web framework!

# Quick start

## Install

Using [vite](https://vitejs.dev/) to construct this project, will publish a vite template soon. (the template is simple and only requires a plugin called `vite-plugin-dlight-transpiler` in vite's config file)

Now to save your time, there're two simple ways to preview this project:

1. clone this project https://github.com/dlight-js/dlight-vite-template for a quick start
2. 🌟 play around in this [codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-template-4tgogd?file=%2Fsrc%2FMyComp.jsd&selection=%5B%7B%22endColumn%22%3A22%2C%22endLineNumber%22%3A15%2C%22startColumn%22%3A22%2C%22startLineNumber%22%3A15%7D%5D)

## Render

Mount your dlight component to any html element with id.

```typescript
import {render} from "@dlightjs/dlight"
import {MyComp} from "./MyComp.tsx"

render("app", new MyComp())
```

## Write your own component 



# Performance
* 5 warm-ups, mean results of 10 times, will re-calc soon

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



