# DLight

EN | [中文](./zh/README-dlight-jsx.md)

[JSD](../packages/@dlightjs/dlight/docs/README.md) | JSX

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
import {MyComp} from "./MyComp.jsx"

render("app", MyComp)
```

## Write your own component

First thing first, DLight is not using template/functional components. It uses **Class component** instead, but not like React Class component. We are not fans of writing nesting logic inside your view and want to **split the view and logic**, so we choose not to use functional component with its returned value as view. In the meantime, we want to make our component **as flexible as possible**,so here we comes the DLight class component. We realize there's one big burden to write a class component -- 'this'. You have to use this.xxx to access a class property. So **currently we're building a babel plugin to 'eliminate this' in a class and auto find the binding object**. Sadly now you have to write 'this.value'. But it's still okay, right?

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

## Pass a prop

Dlight use @Prop to identify if this class member is a prop.

1. A reactive prop that **changes with its passer's states**.
   
   `<div id="other-comp" />` in `MyOtherComp` will change its innerText if `count` in `MyComp` changes.
   
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
     )
   }
   ```
   
2. A reactive prop that changes with its passer's states and its passer's states change with it at the same time, which means these two props **"bind" together**.
   
   `<div id="mycomp" />` in `MyComp` will change its innerText if `countPropState` in `MyOtherComp` changes.
   
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
     )
   }
   ```
   

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
  
    Body = (
      <>
        <button onclick={() => {
          this.count++	// this won't be listened because it's inside an arrow function
        }}>
          +
        </button>
        <div>{this.count}</div>  // everytime you click the button, this div's innerText will be reset
      </>
    )
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

  Body = <div>{this.fullName}</div>
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
  
  ```jsx
  ...
  Body = (
    <div 
      willAppear={() => {
        console.log("I will appear")
      }}
      didAppear={el => {
        console.log(`I just appeared, I am ${el}`)
      }}
    />
  )
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
  // this._$children will be <div>hello</div> and <div>dlight</div> in this case
  // this._$childrenFunc will be () => <div>hello</div> and () => <div>dlight</div> in this case


  Body = (
    <>
    	{this._$children}
			{this._$childrenFunc.map(childFunc => childFunc())}
		</>
  )
}

export class MyComp extends View {
  Body = (
    <MySubComp>
      <div>hello</div>
      <div>dlight</div>
    </MySubComp>
  )
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
  Body = (
    <>
      <div>hello</div>
      <div>dlight</div>
    </>
  )
}

class MyComp extends View {
  myHTMLElement?
  myHTMLElements?
  didMount() {
    console.log(myHTMLElement) // will be <div>good morning</div>
    console.log(myHTMLElements) // will be [<div>hello</div>, <div>dlight</div>]
  }
  Body = (
    <>
      <div element={this.myHTMLElement}>good morning</div>
      <MySubComp element={this.myHTMLElements}/>
    </>
  )
}
```

# Internal tags

## Array

1. You can first use unoptimized array map-out to create an array of elements, but once the array is changed even with a single item of it, the whole array of elements will be removed and recreated. So don't use it **unless it's a fixed array or you know what you're doing**.

   ```jsx
   ...
   Body = (
     <div>
       { this.array.map(item => <div>{item}</div>) }
     </div>
   )
   ...
   ```

2. 🌟Use internal supported For node for **optimization**.

   You can use any **"of" expression** that you write in js `for` loop.

   e.g. -> `let item of array` / `let [key, item] of array.entries()` / `let {key1, key2} of array` / ...

   ```jsx
   ...
   Body = (
     <div>
       <For expression="let item of this.array">
         <div>{item}</div>
       </For>
     </div>
   )
   ...
   ```

   Also, we can use a `key` prop to bind the element with the key.

   ```jsx
   ...
   Body = (
     <div>
       <For expression="let {id, item} of this.array" key="id">
         <div>{item}</div>
       </For>
     </div>
   )
   ...
   ```

## Condition

1. You can first use ( condition && YourElement ) just like you always do in react.

   ```jsx
   ...
   Body = (
     <div>
       { this.show && "show me" }
     </div>
   )
   ...
   ```

2. 🌟Use internal supported If/ElseIf/Else node for **condition break**.

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

## Environment

- Provide an internal easy and simple context management.
- The underlying pricipal of `environment` is just like how you pass a prop in Dlight, so **there're no extra cost**!
- We use `@Env` to indentify it.

```jsx
import {View, required} from "@dlightjs/dlight"

class MyNestComp extends View {
  @Env myMessage = "default value"
  // will show "use me anywhere inside this environment"
  Body = (
    <div>
      {this.myMessage}
    </div>
  )
}

class MySubComp2 extends View {
  @Env myMessage = "default value"
  // will show "use me anywhere inside this environment"
  Body = (
    <div>
      {this.myMessage}
    </div>
  )
}

class MySubComp1 extends View {
  @Env myMessage = "default value"
  // call MySubComp
  // will show "use me anywhere inside this environment"
  Body = (
    <>
      <MyNestComp/>  
      <div>
        {this.myMessage}
      </div> 
    </>
  )
}

export class MyComp extends View {  
  Body = (
    <Env myMessage="use me anywhere inside this environment"> 
      <MySubComp1/>
      <MySubComp2/>
    </Env
  )
}
```
