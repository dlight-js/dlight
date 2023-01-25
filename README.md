# 🧬 DLight.js

DLight.js is a gooooood web framework!

* ⚡️ Performant
  * Dlight optimizes codes in compiling stage and directly manipulates DOM. Dlight is even faster than vanilla JavaScript code(because sometimes you may not know how to write a fully optimized one).
* 🚲 Simple
  * No more complex hooks towards reactivity, only use @State, and dep-chain will help you do the rest.
  * Dlight provide context management power by default.
* 🍼 Friendly
  * Support jsx and jsd(our new domain syntax) to help you write everything in js.
* 🦋 Beautiful
  * Every line of code in DLight is elegant and beautiful!

# Introduction

DLight uses [vite](https://vitejs.dev/) to construct its apps. We mainly use this vite plugin-`vite-plugin-dlight-transpiler` to transpile jsx/jsd file into pure js code.

# Quick start

1. Use CLI to build a dlight app. (This feature is still in development.)

``` shell
npm install -g @dlightjs/cli
create-dlight-app my-first-dlight-app
```

2. Clone this repo https://github.com/dlight-js/dlight-vite-template for a quick start.
3. 🌟 Play around in [codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-template-4tgogd?file=%2Fsrc%2FMyComp.jsd&selection=%5B%7B%22endColumn%22%3A22%2C%22endLineNumber%22%3A15%2C%22startColumn%22%3A22%2C%22startLineNumber%22%3A15%7D%5D)

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
  )
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

## Pass a prop

* Dlight use @Prop to identify if this class member is a prop.

1. A reactive prop that changes with its passer's states.

   `<div id="other-comp" />` in `MyOtherComp`  will change its innerText if `count` in `MyComp `changes.

### jsx

```jsx
import {View, required} from "@dlightjs/dlight"

class MyOtherComp extends View {
  // "required" is just `const required = undefined as any`, we use this to identify that this prop must be passed
  @Prop countProp = required 

  Body = (
   	<div id="other-comp">{this.countProp}</div>
  )
}

export class MyComp extends View {
  @State count = 0
  
  Body = (
    <>
      <button onclick={() => {this.count++}}>
        +
      </button>
      <button onclick={() => {this.count--}}>
        -
      </button>
    	<MyOtherComp countProp={this.count}/>
    </>
  );
}


```

### jsd

```jsx
import {View, required} from "@dlightjs/dlight"

class MyOtherComp extends View {
  // "required" is just `const required = undefined as any`, we use this to identify that this prop must be passed
  @Prop countProp = required 

  Body() {
    div(this.countProp)
      .id("other-comp")
  }
}

export class MyComp extends View {
  @State count = 0
  
  Body() {
    button("+")
      .onclick(() => {
        this.count ++
      })
    button("-")
      .onclick(() => {
        this.count --
      })
  	MyOtherComp({countProp: this.count})
  }
}


```

2. A reactive prop that changes with its passer's states and its passer's states change with it at the same time, which means these two props "bind" together.

   `<div id="mycomp" />` in `MyComp`  will change its innerText if `countPropState` in `MyOtherComp `changes.

### jsx

```jsx
import {View, required} from "@dlightjs/dlight"

class MyOtherComp extends View {
  @PropState countPropState = required 

  Body = (
    <>
    	<button onclick={() => {this.countPropState++}}>
        +
      </button>
      <button onclick={() => {this.countPropState--}}>
        -
      </button>
    </>
  )
}

export class MyComp extends View {
  @State count = 0
  
  Body = (
    <>
      <div id="mycomp">{this.count}</div>
    	<MyOtherComp countPropState={this.count}/>
    </>
  );
}


```

### jsd

```jsx
import {View, required} from "@dlightjs/dlight"

class MyOtherComp extends View {
  @PropState countPropState = required 

  Body() {
    button("+")
      .onclick(() => {
        this.countPropState ++
      })
    button("-")
      .onclick(() => {
        this.countPropState --
      })
    
  }
}

export class MyComp extends View {
  @State count = 0
  
  Body() {
    div(this.cout)
      .id("mycomp")
  	MyOtherComp({countPropState: this.count})
  }
}

```

# JSD

## Why JSD?

Because I'm a big fan of iOS and [SwiftUI](https://developer.apple.com/xcode/swiftui/) and don't like any html-like syntax like jsx.

So if you're like me, just try jsd and make your js code more js! If not, just try it. Still not, ignore it and go back to jsx because we also support it.

## Basic concepts

### example

```js
...
Body() {
  div("this auto set it inner text")
  div {
    button("first child")
    	.onclick(() => {
      	console.log("write dot prop")
      })
    div({id: "second-child-div", innerText: "you can also set prop like this"})
  }
  "plain text node"
  `this is text node too, ${this.anyMessage}`
  {{ }}
}
...
```



### tag and node

We call strings like `div` /  `MyOtherComp` /  `If` in `Body` as tags. And it will compile to a node in the transpiler stage. We have these following protocols.

1. Tag that starts with a lowercase letter is a html tag, e.g. `div` `button`

2. Tag that starts with a uppercase letter is a custom component tag, e.g. `MyComp` `MyOtherComp`

3. Tag that starts with a uppercase letter maybe an internal tag. 

   Current internal tag includes: `If` `ElseIf` `Else` `For` `Environment` 

### prop

Three ways to set a prop, the 1st and 2nd ones are equal.

1. ```js
   TagName({ prop1: "hello", prop2: "world" })
   ```

2. ```TagName()
   TagName()
   	.prop1("hello")
   	.prop2("world")
   ```

3. ```js
   TagName("your _$content prop")
   ```

For different tags, prop means different things.

1. Html tag

   * 1/2 prop means html element attributes.

     e.g. `div("hello").id("hello-div")` =>` el.id = "hello-div"`

   * 1/2 prop that starts with a "_" is a shorthand of style attributes.

     e.g. `div("hello")._color("red")` =>` el.style.color = "red"`

   * 3 prop sets html element innerText and will be replaced by its children.

     e.g. `div("hello")` =>` el.style.innerText = "hello"`

     ```js
     div("this will not show") {
       div("because I'm its child, I overwrite its innerText")
     }

2. Custom component

   * 1/2 prop means custom component props as `Quick start - pass a prop` section describes.

   * 3 prop set the custom component prop named  `_$content`

     ```js
     import {View, required} from "@dlightjs/dlight"
     
     class MyOtherComp extends View {
       @Prop _$content = required
     
       Body() {
         div(this._$content) // display "hello world"
       }
     }
     
     export class MyComp extends View {  
       Body() {
       	MyOtherComp("hello world")
       }
     }
     
     ```

3. Internal tag

   * See `Features` section	

### children

`{}` are children wrapper symbols.

In jsd, we don't need a empty tag like `<></>` to wrap multiple elements, jsd will automatically collect tags that appear inside `{}`.

For different tags, children means different things.

1. Html tag

   * Children are it's HTMLNodes.

2. Custom component

   * Children will be stored in `class._$children`, you need to manually control it if you want to use them.

     e.g. let's write an HOC that wraps all childnodes with a red div:

     ```js
     import {View, required} from "@dlightjs/dlight"
     
     class RedDivHOC extends View {
       Body() {
         div {
           {{ this._$children }}
         }	
         	._backgroundColor("red")
       }
     }
     
     export class MyComp extends View {  
       Body() {
       	RedDivHOC {
           div("first child")
           button("second child")
           span("third child")
         }
       }
     }
     
     ```

3. Internal tag
   * See `Features` section	

### expression

In jsx, strings wrapped with `{}` are called expression. e.g.

```jsx
...
Body = (
  <div>
    { !console.log("expression just like you used to write") && "display this sentence" }
    { this.show && <div>will show if this.show is true</div>}
  </div>
)
...
```

In jsd, we use `{{}}` instead of single `{}` because it's the symbol for children wrapper. And inside the expression, we also use `{{}}` to mark that the content inside it is a sub-block of jsd Body. e.g.

```jsx
...
Body() {
  div {
    {{ !console.log("expression just like you used to write") && "display this sentence" }}
    {{ this.show && {{
         div("will show if this.show is true")
       }}
    }}
  }
}
...
```

(Not very elegant yet. Welcome to propose any syntax that you think is the best.)

### contribution

Jsd is still under design and if you have a great design proposal or any problem about it, welcome to open an issue or a discussion!

# Features

## Array

1. You can first use unoptimized array map out to create an array of elements, but once the array is changed even with a single item of it, the whole array of elements will be removed and recreated. So don't use it unless you know what you're doing.

### jsx

```jsx
...
Body = (
  <div>
    { this.array.map(item => <div>{item}</div>) }
  </div>
)
...
```

### jsd

```js
...
Body() {
  div {
    {{ this.array.map(item => {{
      	`${item}`
    	}}
    }}
  }
}
...
```

2. Use internal supported For node for optimization. 

   You can use any "of" expression you write in js for loop. 

   e.g. -> ( let item of array ) / ( let [key, item] of array.entries() ) / ( let {key1, key2} of array) / ...

### jsx

```jsx
...
Body = (
  <div>
    <For expression="let item of this.array">
      {item}
    </For>
  </div>
)
...
```

### jsd

🌟

```js
...
Body() {
  div {
    For (let item of this.array) {
      `${item}`
    }
  }
}
...
```

## Condition

1. You can first use ( condition && YourElement ) just like you always do in react.

### jsx

```jsx
...
Body = (
  <div>
    { this.show && "show me" }
  </div>
)
...
```

### jsd

```js
...
Body() {
  div({{ this.show && "show me" }})
}
...
```

2. Use internal supported If/ElseIf/Else node for break. 

### jsx

```jsx
...
Body = (
  <div>
    <If condition={this.show}>
    	show me
    </If>
    <ElseIf condition={this.alsoShow}>
    	also show me
    </ElseIf>
    <Else>
    	don't show me
    </Else>
  </div>
)
...
```

### jsd

🌟

```js
...
Body() {
  div {
    If (this.show) {
      "show me"
    } ElseIf (this.alsoShow) {
      "also show me"
    } Else {
    	"don't show me"
    }
  }
}
...
```

🌟 When using jsd, For and If expression are the same with for and if in javascript!

## Environment



# Performance

* 5 warm-ups, mean results of 10 times, will re-calc soon, currently approximately 1.01x vanilla js (but require more memory).

# Core Concept

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
- [ ] route

* plugins
- [x] vite transpiler plugin
- [ ] vscode language server for auto completion

* other

- [ ] docs
- [ ] tutorials
- [ ] video tutorials
