# DLight

EN | [中文](../../../docs/zh/README-dlight.md)

JSD | [JSX](../../../docs/README-dlight-jsx.md)

# Tip

Search 🌟 in doc for important concepts and performance results.

# Quick start

DLight uses [vite](https://vitejs.dev/) to construct its apps. We mainly use [this vite plugin](https://www.npmjs.com/package/vite-plugin-dlight-transpiler) to transpile jsx/jsd file into pure js code.

Three ways to try DLight.js out.

1. Use CLI to build a dlight app. (**This feature is still in development.**)

```shell
npm install -g @dlightjs/cli
create-dlight-app my-first-dlight-app
```

2. Clone this repo https://github.com/dlight-js/dlight-vite-template for a quick start.
3. 🌟 Play around in [codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-quickstart-4tgogd)

## Render

Mount your dlight component to any **html element with an id**.

```typescript
import {render} from "@dlightjs/dlight"
import {MyComp} from "./MyComp.jsd"

render("app", MyComp)
```

## Write your own component

First thing first, DLight is not using template/functional components. It uses **Class component** instead, but not like React Class component. We are not fans of writing nesting logic inside your view and want to **split the view and logic**, so we choose not to use functional component with its returned value as view. In the meantime, we want to make our component **as flexible as possible**,so here we comes the DLight class component. We realize there's one big burden to write a class component -- 'this'. You have to use this.xxx to access a class property. So **currently we're building a babel plugin to 'eliminate this' in a class and auto find the binding object**. Sadly now you have to write 'this.value'. But it's still okay, right?

```jsx
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

Dlight use @Prop to identify if this class member is a prop.

1. A reactive prop that **changes with its passer's states**.
   
   `<div id="other-comp" />` in `MyOtherComp` will change its innerText if `count` in `MyComp` changes.
   
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
   
2. A reactive prop that changes with its passer's states and its passer's states change with it at the same time, which means these two props **"bind" together**.
   
   `<div id="mycomp" />` in `MyComp` will change its innerText if `countPropState` in `MyOtherComp` changes.
   
   - jsx
   
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

## 🌟Why JSD

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
  Exp("this is expression")
}
...
```

### tag and node

We call strings like `div` / `MyOtherComp` / `If` in `Body` as tags. And it will compile to a node in the transpiler stage. We have these following protocols.

1. Tag that starts with a lowercase letter is a html tag, e.g. `div` `button`

2. Tag that starts with a uppercase letter is a custom component tag, e.g. `MyComp` `MyOtherComp`

3. Tag that starts with a uppercase letter maybe an internal tag.

   Current internal tag includes: `If` `ElseIf` `Else` `For` `Environment`

We also have invisible tag like expression and text

1. Strings wrapped with `Exp` are called expression, detailed in the next section.
2. Strings wrapped with `"` \ `'` \ ` are called textNode. It's created by `document.createTextNode()`

### expression

In jsx, strings wrapped with `{}` are called expression. e.g.

```jsx
...
Body = (
  <div>
    { !console.log("expression just like you used to write") && "display this sentence" }
    { this.show && <div>will show if this.show is true</div> }
  </div>
)
...
```

In jsd, we use `Exp` to identifier expression. And inside the expression, we use `@{}` to mark that the content inside it is a sub-block of jsd Body. e.g.

```jsx
...
Body() {
  div {
    Exp(!console.log("expression just like you used to write") && "display this sentence")
    Exp(this.show && @{
      div("will show if this.show is true")
    })
  }
}
...
```

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

   - 1/2 prop means html element attributes.

     e.g. `div("hello").id("hello-div")` => `el.id = "hello-div"`

   - 1/2 prop that starts with a "_" is a shorthand of style attributes.

     e.g. `div("hello")._color("red")` => `el.style.color = "red"`

   - 3 prop sets html element innerText and will be replaced by its children.

     e.g. `div("hello")` => `el.style.innerText = "hello"`

     ```js
     div("this will not show") {
       div("because I'm its child, I overwrite its innerText")
     }
     ```

2. Custom component

   - 1/2 prop means custom component props as `Quick start - pass a prop` section describes.

   - 3 prop set the custom component prop named `_$content`

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

   - See `Features` section

### contribution

Jsd is still under design and if you have a great design proposal or any problem about it, welcome to open an issue or a discussion!

# Reactivity

In Dlight, reactivity is **simple and efficient**!

## State

- Use **@State **to mark a class member as **reactive variable**. Whenever the variable is set, all the attributes in a html element that uses this variable will recalculate the attribute(🌟not rerender the element, it has much more fine granularity!)

- **Two exceptions** 
  
  1. If you're using an **arrow function** to wrap this variable, dlight will **consider it as a callback** like `onclick`, which has no need to reset this attribute, so the reactivity will be dropped in this attribute. If somehow you still want dlight to listen inside it, use `function` instead of `arrow function`.
  
     e.g. `() => { console.log(this.count) }` => won't be listened

     `function() { console.log(this.count) }` => will be listened
  
  2. If you're setting a state, we won't listen to it because it will cause a dep loop.
  
     For example, imagine you're using React, `this.count = 1` should be `setCount(1)`, so we won't treat count as a react prop. Another case: `this.count = this.count + 1`, in React it should be `setCount(prev => prev+1)`. Also, we won't let DLight that. 
  
- Example

  ```jsx
  import {View} from "@dlightjs/dlight"
  
  export class MyComp extends View {
    @State count = 0
  
    Body() {
      button("+")
        .onclick(() => {
          this.count ++  // this won't be listened because it's inside an arrow function
        })
      button("-")
        .onclick(() => {
          this.count --
        })
      div(this.count)  // everytime you click the button, this div's innerText will be reset
    }
  }
  ```

## dep-chain

Of all the frameworks in the market, there's **no painless usage of a `derived state`** (of course other mvvm frameworks are great, I love react, vue, solid, svelte, ...).

Say we have a list of people's first names and last names and we want to concatenate them as full names.

How react would do it:

```jsx
function ShowMeTheName() {
  const [firstName, setFirstName] = useState('John')
  const [lastName, setLastName] = useState('Doe')

  const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName])

  return <div>{fullName}</div>
}
```

How solid would do it:

```jsx
function ShowMeTheName() {
  const [firstName, setFirstName] = createSignal('John')
  const [lastName, setLastName] = createSignal('Doe')

  // use "createMemo" to avoid re-calculate in solid
  const fullName = createMemo(() => `${firstName()} ${lastName()}`)

  return <div>{fullName()}</div>
}
```

🌟This is how we do this in dlight:

```jsx
class ShowMeTheName extends View {
  @State firstName = 'John'
  @State lastName = 'Doe'
  fullName = `${this.firstName} ${this.lastName}`

  Body() {
    div(this.fullName)
  }
}
```

Yeah! That's right, **you don't need to do anything to make a `derived` member reactive**. Dlight will automatically make `fullName` reactive because it's derived from state variables. Whenever `firstName` or `lastName` changes, `fullName` will re-calculate for only once and change any html elements' attribute that uses it.

**So, what is dep-chain?**

🌟This is a term that describes how DLight's reactivity works. All the deps in the chain will be reactive because of the headnode of the chain(which is a state variable) and **will be calculate again if the headnode changes**, then all html elements' attributes related to them will be changed too.

Dep-chain examples:

1. Chains
   
   `count => null`
   
   `flag => null`
   
   ```js
   class DepChainExample1 extends View {
     @State count = 0
     @State flag = true
   }
   ```

2. Chains
   
   `count => countPlus1 => countPlus1Plus1 => null`
   
    		  `=> countPlus2 => null`
   
   `flag => noFlag => null`
   
   ```js
   class DepChainExample2 extends View {
     @State count = 0
     countPlus1 = this.count + 1
     countPlus2 = this.count + 2
     countPlus1Plus1 = this.countPlus1 + 1
   
     @State flag = true
     noFlag = !this.flag
   }
   ```

3. Chains
   
   `count => null`
   
   ```js
   class DepChainExample3 extends View {
     @State count = 0
     // logCount will not be added into dep-chain because it's wrapped with an arrow function
     logCount = () => {
       console.log(this.count)
     }
   }
   ```

4. Chains
   
   `count => logCount => null`
   
   ```js
   class DepChainExample4 extends View {
     @State count = 0
     // logCount will be added into dep-chain because it's wrapped with a function
     logCount = function() {
       console.log(this.count)
     }.bind(this)
   }
   ```

5. Use dep-chain to perform `useEffect`?
   
   DLight won't have a lot of circumstances that require a "side effect" because **`derived` variable can solve most of the case**. However, if you still want to use it to listen changes or for other specific reason, you can try this:
   
   ```js
   class DepChainExample5 extends View {
     @State count = 0
     // watchCountChange will be added into dep-chain because it's wrapped with a function
     // and this function will re-called if "count" changes
     watchCountChange = function() {
       console.log(this.count)
     }.call(this)
   }
   ```

6. 🌟My variable is a result of a function, how to make it reactive?
   
   There're two ways to do it. Always remember the arrow function and setValue are the only exception, any other expression will automatically collect deps if you use one of the variables in the dep-chain
   
   1. Just like how we implement `useEffect`
   
   ```js
   class DepChainExample6_1 extends View {
     @State count = 0
   
     countPlus1 = function() {
       // do other stuff.....
       return this.count+1
     }.call(this)
   }
   ```
   
   2. Split the function out
   
   ```js
   class DepChainExample6_1 extends View {
     @State count = 0
     getCount = count => {
       // do other stuff.....
       return this.count
     }
     countPlus1 = this.getCount(this.count)
   }
   ```

# Lifecycle

In DLight, we provide real lifecycles for both custom components and html elements.

## Html elements

`willAppear` / `didAppear` / `willDisappear` / `didDisappear`

- The calling timing can be described as the following pseudocode:
  
  ```js
  // appear
  el.willAppear()
  parentEl.appendChild(el)
  el.didAppear()
  
  // disappear
  el.willDisappear()
  el.remove()
  el.didDisappear()
  ```
  
  Dlight only calls these hooks when the element is created or removed. That's why we say it is "real" lifecycles.

- Usage
  
  ```js
  ...
  Body() {
    div 
      .willAppear(() => {
        console.log("I will appear")
      })
      .didAppear=(el => {
        console.log(`I just appeared, I am ${el}`)
      })
  }
  ...
  ```
  

## Custom components

`willMount` / `didMount` / `willUnmount` / `didUnmount`

- The calling timing can be described as the following pseudocode:
  
  ```js
  // mount
  MyComp.willMount()
  MyComp.allHTMLEls.willAppear()
  MyComp.allHTMLEls.didAppear()
  MyComp.didMount()
  
  // unmount
  MyComp.willUnmount()
  MyComp.allHTMLEls.willDisappear()
  MyComp.allHTMLEls.didDisappear()
  MyComp.didUnmount()
  delete MyComp
  ```

- Usage
  
  ```jsx
  class MyComp extends View {
    didMount() {
      console.log("I just mounted")
    }
    willUnmount() {
      console.log("bye-bye")
    }
  }
  ```

# Features

## Custom Component's Children

You can get children in a custom component with a inner class member called `this._$children` and `this._$childrenFunc`. The difference is that the child of `this._$children` is a node in dlight and that of `this._$childrenFunc` is **a function that returns the node**. The latter one may be useful if you want to **build a conditional component and called the function to return the node multiple times** like `If` or `Route`.

```jsx
import {View} from "@dlightjs/dlight"

class MySubComp extends View {
  // this._$children will be div("hello") and div("dlight") in this case
  // this._$childrenFunc will be () => div("hello") and () => div("dlight") in this case


  Body() {
    Exp(this._$children)
    Exp(this._$childrenFunc.map(childFunc => childFunc()))
  }
}

export class MyComp extends View {
  Body() {
    MySubComp {
      div("hello")
      div("dlight")
    }
  }
}
```

## Custom Component's name

You can access your component or your children component's tag name by using `this._$tag`

```jsx
import {View} from "@dlightjs/dlight"

class ThisIsMyComponentHah extends View {
  didMount() {
    console.log(this._$tag) // will log "ThisIsMyComponentHah"
  }
}
```

## Element map out

Sometimes, you need to access the html element in DOM and alter it manually.

🌟Both HTMLNode and your CustomNode can get element(s)

```jsx
import {View} from "@dlightjs/dlight"

class MySubComp extends View {
  Body() {
    div("hello")
    div("dlight")
  }
}

class MyComp extends View {
  myHTMLElement?
  myHTMLElements?
  didMount() {
    console.log(myHTMLElement) // will be <div>good morning</div>
    console.log(myHTMLElements) // will be [<div>hello</div>, <div>dlight</div>]
  }
  Body() {
    div("good morning")
    	.element(this.myHTMLElement)
    MySubComp()
  		.element(this.myHTMLElements)
  }
}
```

# Internal tags

## Array

1. You can first use unoptimized array map-out to create an array of elements, but once the array is changed even with a single item of it, the whole array of elements will be removed and recreated. So don't use it **unless it's a fixed array or you know what you're doing**.

   ```jsx
   ...
   Body() {
     div {
       Exp(this.array.map(item => @{
           div(item)
       }))
     }
   }
   ...
   ```

2. 🌟Use internal supported For node for **optimization**.

   You can use any **"of" expression** that you write in js `for` loop.

   e.g. -> `let item of array` / `let [key, item] of array.entries()` / `let {key1, key2} of array` / ...

   ```jsx
   ...
   Body() {
     div {
       For (let item of this.array) {
         div(item)
       }
     }
   }
   ...
   ```

   Also, we can use a `key` prop to bind the element with the key.

   ```jsx
   ...
   Body() {
     div {
       For (let {id, item} of this.array)[id] {
         div(item)
       }
     }
   }
   ...
   ```

## Condition

1. You can first use ( condition && YourElement ) just like you always do in react.

   ```jsx
   ...
   Body() {
     div(this.show && "show me")
   }
   ...
   ```
   
2. 🌟Use internal supported If/ElseIf/Else node for **condition break**.

   ```jsx
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

## Environment

- Provide an internal easy and simple context management.
- The underlying pricipal of `environment` is just like how you pass a prop in Dlight, so **there're no extra cost**!
- We use `@Env` to indentify it.

```js
import {View, required} from "@dlightjs/dlight"

class MyNestComp extends View {
  @Env myMessage = "default value"
  Body() {
    div(this.myMessage)  // will show "use me anywhere inside this environment"
  }
}

class MySubComp2 extends View {
  @Env myMessage = "default value"
  Body() {
    div(this.myMessage)  // will show "use me anywhere inside this environment"
  }
}

class MySubComp1 extends View {
  @Env myMessage = "default value"
  Body() {
    MyNestComp()  // call MySubComp2
    div(this.myMessage)  // will show "use me anywhere inside this environment"
  }
}

export class MyComp extends View {  
  Body() {
    Env({myMessage: "use me anywhere inside this environment"}) {
      MySubComp1()
      MySubComp2()
    }
  }
}
```
