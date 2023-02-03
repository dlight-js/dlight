# Tip

在文档里搜索🌟查看重要概念和演示结果

# 快速开始

DLight使用vite构建应用，主要使用到了[vite插件](https://www.npmjs.com/package/vite-plugin-dlight-transpiler)来将jsx/jsd编译成纯js代码

三种方法开始体验DLight.js

1. 用CLI搭建一个dlight应用。（开发中）

```shell
npm install -g @dlightjs/cli
create-dlight-app my-first-dlight-app
```

2. clone这个[github仓库](https://github.com/dlight-js/dlight-vite-template)，快速开始
3. 在[codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-quickstart-4tgogd?file=%2Fpackage.json)中体验

## Render方法

将你的dlight组件挂载在相应id的html元素上

```typescript
import {render} from "@dlightjs/dlight"
import {MyComp} from "./MyComp.jsx"

render("app", MyComp)
```

## 自定义组件

First thing first, DLight is not using template/functional components. It uses Class component instead, but not like React Class component. There're two ways to write a component.

首页，DLight不用模版组件或函数式组件，而是使用class组件。有两种方法来写一个组件。

1. `.jsx`文件（使用jsx语法）

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

2.  `.jsd` 文件（使用jsd语法，我们的新语法）
   
   We create a new domain syntax in `(class xx extends View).Body`. It is pretty similar to SwiftUI syntax. We will walk you through in the next section. Here's an example with the same output of the previous `.jsx` file.
   
   我们创造了一个新的js扩展语法 `(class xx extends View).Body`

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

- Dlight use @Prop to identify if this class member is a prop.
1. A reactive prop that changes with its passer's states.
   
   `<div id="other-comp" />` in `MyOtherComp` will change its innerText if `count` in `MyComp` changes.
   
   - jsx
   
   ```jsx
   import {View} from "@dlightjs/dlight"
   
   class MyOtherComp extends View {
   @Prop countProp 
   
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

```
* jsd

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
   
   `<div id="mycomp" />` in `MyComp` will change its innerText if `countPropState` in `MyOtherComp` changes.
   
   - jsx
   
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
   
   - jsd
   
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

?��

## Why JSD

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

We call strings like `div` / `MyOtherComp` / `If` in `Body` as tags. And it will compile to a node in the transpiler stage. We have these following protocols.

1. Tag that starts with a lowercase letter is a html tag, e.g. `div` `button`

2. Tag that starts with a uppercase letter is a custom component tag, e.g. `MyComp` `MyOtherComp`

3. Tag that starts with a uppercase letter maybe an internal tag.
   
   Current internal tag includes: `If` `ElseIf` `Else` `For` `Environment`

We also have invisible tag like expression and text

1. Strings wrapped with `{{}}` are called expression, detailed in the next section.
2. Strings wrapped with `"` \ `'` \ ` are called textNode. It's created by `document.createTextNode()`

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

### children

`{}` are children wrapper symbols.

In jsd, we don't need a empty tag like `<></>` to wrap multiple elements, jsd will automatically collect tags that appear inside `{}`.

For different tags, children means different things.

1. Html tag
   
   - Children are it's HTMLNodes.

2. Custom component
   
   - Children will be stored in `class._$children`, you need to manually control it if you want to use them.
     
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
   
   - See `Features` section

### contribution

Jsd is still under design and if you have a great design proposal or any problem about it, welcome to open an issue or a discussion!

# Internal tags

## Array

1. You can first use unoptimized array map-out to create an array of elements, but once the array is changed even with a single item of it, the whole array of elements will be removed and recreated. So don't use it unless you know what you're doing.
   
   - jsx
   
   ```jsx
   ...
   Body = (
   <div>
     { this.array.map(item => <div>{item}</div>) }
   </div>
   )
   ...
   ```
   
   - Jsd
   
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
   
   You can use any "of" expression you write in js `for` loop.
   
   e.g. -> `let item of array` / `let [key, item] of array.entries()` / `let {key1, key2} of array` / ...
   
   - jsx
   
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
   
   - ?��jsd
   
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
   
   Also, we can use a `key` prop to bind the element with the key.
   
   - jsx
   
   ```jsx
   ...
   Body = (
   <div>
     <For expression="let {id, item} of this.array" key="id">
       {item}
     </For>
   </div>
   )
   ...
   ```
   
   - ?�� jsd
   
   ```js
   ...
   Body() {
   div {
     For (let {id, item} of this.array)[id] {
       `${item}`
     }
   }
   }
   ...
   ```

## Condition

1. You can first use ( condition && YourElement ) just like you always do in react.
   
   - jsx
   
   ```jsx
   ...
   Body = (
   <div>
     { this.show && "show me" }
   </div>
   )
   ...
   ```
   
   - jsd
   
   ```js
   ...
   Body() {
   div({{ this.show && "show me" }})
   }
   ...
   ```

2. Use internal supported If/ElseIf/Else node for break.
   
   - jsx
   
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
   
   - ?��jsd
   
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

?�� When using jsd, For and If expression are the same with `for` and `if` in javascript!

## Environment

- Provide an internal easy and simple context management.
- The underlying pricipal of `environment` is just like how you pass a prop in Dlight, so there're no extra cost!
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
    Environment({myMessage: "use me anywhere inside this environment"}) {
      MySubComp1()
      MySubComp2()
    }
  }
}
```

# Reactivity

In Dlight, reactivity is simple and efficient!

## State

- Use @State to mark a class member as reactive variable. Whenever the variable is set, all the attributes in a html element that uses this variable will recalculate the attribute(not rerender the element, it has much more fine granularity!)

- One exception -- if you're using an arrow function to wrap this variable, dlight will consider it as a callback like `onclick`, which has no need to reset this attribute, so the reactivity will be dropped in this attribute. If somehow you still want dlight to listen inside it, use `function` instead of `arrow function`.
  
  e.g. `() => { console.log(this.count) }` => won't be listened
  
  �? `function() { console.log(this.count) }` => will be listened

- Example
  
  - jsx
  
  ```jsx
  import {View} from "@dlightjs/dlight"
  
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
        <div>{this.count}</div>  // everytime you click the button, this div's innerText will be reset
      </>
    )
  }
  ```

```
* jsd

```js
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
    div(this.count)  // everytime you click the button, this div's innerText will be reset
  }
}
```

## dep-chain

Of all the frameworks in the market, there's no painless usage of a `derived state`.

Say we have a list of people's first names and last names and we want to concat them as full names.

How react would do:

```jsx
function ShowMeTheName() {
  const [firstName, setFirstName] = useState('John')
  const [lastName, setLastName] = useState('Doe')

  const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName])

  return <div>{fullName}</div>
}
```

How solid would do:

```jsx
function ShowMeTheName() {
  const [firstName, setFirstName] = createSignal('John')
  const [lastName, setLastName] = createSignal('Doe')

  // use "createMemo" to avoid re-calculate
  const fullName = createMemo(() => `${firstName()} ${lastName()}`)

  return <div>{fullName()}</div>
}
```

?��This is how we do in dlight:

```jsx
class ShowMeTheName extends View {
  @State firstName = 'John'
  @State lastName = 'Doe'
  fullName = `${this.firstName} ${this.lastName}`

  Body = <div>{this.fullName}</div>
}
```

Yeah! That's right, you don't need to do anything to make a `derived` member reactive. Dlight will automatically make `fullName` reactive because it's derived from state variables. Whenever `firstName` or `lastName` changes, `fullName` will re-calculate for only once and change any html elements' attribute that uses it.

So, what is dep-chain?

?��This is a term that describes how DLight's reactivity works. All the deps in the chain will be reactive because of the headnode of the chain(which is a state variable) and will be calculate again if the headnode changes, then all html elements' attributes related to them will be changed too.

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
   
   �? `=> countPlus2 => null`
   
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
   
   DLight won't have a lot of circumstances that require a "side effect" because `derived` variable can solve most of the case. However, if you still want to use it to listen changes or for other specific reason, you can try this:
   
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

6. My variable is a result of a function, how to make it reactive?
   
   There're two ways to do it. Always remember the arrow function is the only exception, any other expression will automatically collect deps if you use one of the variables in the dep-chain
   
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

1. Html elements
   
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
     
     - jsx
     
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
     
     - jsd
     
     ```js
     ...
     Body() {
     div()
         .willAppear(() => {
         console.log("I will appear")
         })
         .didAppear(el => {
         console.log(`I just appeared, I am ${el}`)
           })
     }
     ...
     ```

2. Custom components
   
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

Tutorial

After all these cool features of DLight listed above, let dive right into it!

ps: we use jsd in these tutorials, jsx is just the same and we also provide both code samples in /apps/example and codesandbox.

## Switch-case

```js
// -> ./switch.jsd
import {View, required} from "@dlightjs/dlight"

export class Switch extends View {
    @Prop _$content = required    // _$content is the default prop of Switch(xxx)

    caseChildren = function() {
        let targetNodes = []
        for (let child of this._$children) {
            // if the tag name is not "Case" or "Default", 
              // display it no matter the condition
            if (["Default", "Case"].includes(child._$tag)) {
                targetNodes.push(child)
                continue
            }
            if (this._$content === child._$content || child._$tag !== "Default") {
                targetNodes.push(...child._$children)
                break
            }
        }
        return targetNodes
    }.call(this)

    Body() {
        {{ this.caseChildren }}
    }
}
// -> ./case.jsd
import {View, required} from "@dlightjs/dlight";

export class Case extends View {
    @Prop _$content = required
      // We don't add anything to display anything in Case.Body
      // Because in Switch.Body, we find the matched Case._$children and display it directly
}
// -> ./default.jsd
import {View} from "@dlightjs/dlight";

// nothing here, we only need to know this component's tag name is "Default"
export class Default extends View {}
```

Usage

```js
import {Switch} from "./switch.jsd"
import {Case} from "./case.jsd"
import {Default} from "./default.jsd"


export class MyComp extends View {
    @State count = 0

    Body() {
      Switch(this.count) {
        Case(0) {
          div("I am 0")
        }
        Case(1) {
          div("I am 1~~")
        }
        Default {
          div("I am other number")
        }
      }
    }  
}
```

## ToDoApp

?

- jsd
  
  [Codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-quickstart-4tgogd)

  ```js
  // -> ./ToDoApp/index.jsd
  import {View} from "@dlightjs/dlight";
  import {TaskCard} from "./TaskCard.tsd";
  import {TaskAdder} from "./TaskAdder.tsd";
  import {Task} from "./Task";
  
  function _(func: () => any, _: any) {
    return func()
  }
  
  export class ToDoApp extends View {
    @State tasks: Task[] = []
    unfinishedNum = this.tasks.filter(t=>!t.finished).length
  
    watchUnfinishedNum = function() {
      console.log(`remain ${this.unfinishedNum} tasks to do`)
    }.call(this)
  
    Body() {
      h1("ToDo App in DLight.js")
      h2("What needs to be done?")
  
      TaskAdder({tasks: this.tasks})
  
      h2(this.unfinishedNum === 0 ? "You've finished all tasks！" : `Remaining ${this.unfinishedNum} tasks to do.`)
  
      For(let task of this.tasks)[task] {
        TaskCard({task})
          .deleteTask(() => {
            this.tasks = this.tasks.filter(t=>t !== task)
          })
          .toggleBox((checked) => {
            task.finished = checked
            this.tasks = [...this.tasks]
          })
      }
    }
  }
  // -> ./ToDoApp/TaskAdder.jsd
  import {View} from "@dlightjs/dlight"
  import {Task} from "./Task"
  
  export class TaskAdder extends View {
    @State inputText = ""
    @PropState tasks: Task[] = []
    inputEl: HTMLInputElement
  
    Body() {
      input()
        .value(this.inputText)
        .oninput(e => {
          this.inputText = e.target.value
        })
        .element(this.inputEl)
  
      button("add")
        .onclick(() => {
          this.tasks = [...this.tasks, {name: this.inputText, finished: false}]
          this.inputText = ""
          this.inputEl.focus()
        })
  
    }
  }
  // -> ./ToDoApp/TaskCard.jsd
  import {View} from "@dlightjs/dlight"
  import {Task} from "./Task"
  
  export class TaskCard extends View {
    @Prop task: Task
    @Prop deleteTask: () => any
    @Prop toggleBox: (checked: any) => any
    didMount() {
      console.log(`[didAppear] Loaded task named ${this.task.name}, it is${this.task.finished?"":" not"} finished.`)
    }
    didUnmount() {
      console.log(`[didUnMount] Unmount task named ${this.task.name}, it is${this.task.finished?"":" not"} finished.`)
    }
  
    Body() {
      div() {
        input()
          .type("checkbox")
          .checked(this.task.finished)
          .onchange(e => {
              if (e.target.checked !== this.task.finished) {
                this.toggleBox(e.target.checked)
              }
  
          })
  
        span(this.task.name)
          ._margin("0 5px")
          ._text-decoration(this.task.finished ? "line-through" : "none")
          
        button("delete")
          .onclick(this.deleteTask)
      }
        ._padding("5px")
    }
  }
  
  ```
  
  
  
- jsx
  
  [Codesandbox](https://codesandbox.io/p/sandbox/dlight-todoapp-jsd-i8se5e)

```js
// -> ./ToDoApp/index.jsx
import {View} from "@dlightjs/dlight";
import {TaskCard} from "./TaskCard.jsx";
import {TaskAdder} from "./TaskAdder.jsx";

export class ToDoApp extends View {
  @State tasks = []
  unfinishedNum = this.tasks.filter(t=>!t.finished).length

  watchUnfinishedNum = function() {
    console.log(`remain ${this.unfinishedNum} tasks to do`)
  }.call(this)

  deleteTask = (task) => {
    this.tasks = this.tasks.filter(t=>t !== task)
  }

  toggleBox = (checked, task) => {
    task.finished = checked
    this.tasks = [...this.tasks]
  }

  Body = (
      <>
        <h1>ToDo App in DLight.js</h1>
        <h2>What needs to be done?</h2>

        <TaskAdder tasks={this.tasks}/>

        <h2>
          {
            this.unfinishedNum === 0
              ? "You've finished all tasks！"
              : `Remaining ${this.unfinishedNum} tasks to do.`
          }
        </h2>
        {
          this.tasks.map(task => (
            <TaskCard task={task} deleteTask={this.deleteTask} toggleBox={this.toggleBox} />
          ))
        }
        </>
      )

}

```



```js
// -> ./ToDoApp/index.jsd
import {View} from "@dlightjs/dlight"
import {TaskCard} from "./TaskCard.jsd"
import {TaskAdder} from "./TaskAdder.jsd"

export class ToDoApp extends View {
  @State tasks = []  // type: {name: string, finished: boolean}[]
  unfinishedNum = this.tasks.filter(t=>!t.finished).length

  // watch when "unfinishedNum" changes
  watchUnfinishedNum = function() {
    console.log(`remain ${this.unfinishedNum} tasks to do`)
  }.call(this)

  Body() {
    h1("ToDo App in DLight.js")
    h2("What needs to be done?")

    TaskAdder({tasks: this.tasks})  // add task

    h2(this.unfinishedNum === 0 
       ? "You've finished all tasks!" 
       : `Remaining ${this.unfinishedNum} tasks to do.`)

    For(let task of this.tasks)[task] {
      TaskCard({task})
        .deleteTask(() => {
          this.tasks = this.tasks.filter(t=>t !== task)
        })
        .toggleBox((checked) => {
          task.finished = checked
          // force update "tasks", but "task" reference is not changed
          // so it'll cost no time
          this.tasks = [...this.tasks]  
        })
    }
  }
}
// -> ./ToDoApp/TaskAdder.jsd
import {View, required} from "@dlightjs/dlight"

export class TaskAdder extends View {
  @PropState tasks = required
  @State inputText = ""
  inputEl

  Body() {
    input()
      .value(this.inputText)
      .oninput(e => {
        this.inputText = e.target.value  // record "inputText" when type in the input
      })
      .element(this.inputEl)  // set "inputEl" as this element's HTMLElement

    button("add")
      .onclick(() => {
        this.tasks = [...this.tasks, {name: this.inputText, finished: false}]
        this.inputText = ""  // clear inputText when click the button
        this.inputEl.focus()  // auto focus to the input field when click the button
      })

  }   
}
// -> ./ToDoApp/TaskCard.jsd
import {View, required} from "@dlightjs/dlight"

export class TaskCard extends View {
  @Prop task = required
  @Prop deleteTask = required
  @Prop toggleBox = required

  // lifecycle
  didMount() {
    console.log(`[didMount] Loaded task named ${this.task.name}, it is${this.task.finished?"":" not"} finished.`)
  }
  didUnmount() {
    console.log(`[didUnmount] Unmount task named ${this.task.name}, it is${this.task.finished?"":" not"} finished.`)
  }

  Body() {
    div() {
      input()
        .type("checkbox")
        .checked(this.task.finished)
        .onchange(e => {
            this.toggleBox(e.target.checked)
        })

      // set line-through if the task is finished
      span(this.task.name)
        ._margin("0 5px")
        ._textDecoration(this.task.finished ? "line-through" : "none")

      button("delete")
        .onclick(this.deleteTask)
    }
      ._padding("5px")
  }
}
```

## Benchmark

?

Same data build function with [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark)

```js
import {View, required} from "@dlightjs/dlight";

// build data
// ------------------------------
let idCounter = 1;
const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"],
    colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"],
    nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];

function _random (max) { return Math.round(Math.random() * 1000) % max; };

function buildData(count) {
    let data = new Array(count);
    for (let i = 0; i < count; i++) {
        data[i] = {
            id: idCounter++,
            label: `${adjectives[_random(adjectives.length)]} ${colours[_random(colours.length)]} ${nouns[_random(nouns.length)]}`
        }
    }
    return data;
}
// ------------------------------


// views
// ------------------------------
class Row extends View {
    @Prop id = required
    @Prop label = required
    @Prop className = required
    @Prop selectRow = required
    @Prop deleteRow = required
    Body() {
        tr {
            td(this.id)
                .className("col-md-1")
            td(this.label)
                .className("col-md-2")
                .onclick(() => this.selectRow(this.id))
            td("")
                .className("col-md-3")
                .onclick(() => this.deleteRow(this.id))
            td("")
                .className("col-md-4")
        }
            .className(this.className)
    }
}

export class Benchmark extends View {
    @State rows = []
    @State selectIdx = -1
    addRows = () => {
        this.rows = buildData(1000)
    }
    swapRows = () => {
        if (this.rows.length > 999) {
            this.rows = [this.rows[0], this.rows[998], ...this.rows.slice(2, 998), this.rows[1], this.rows[999]]
        }
    }
    clearRows = () => {
        this.rows = []
    }
    selectRow = idx => {
        this.selectIdx = idx
    }
    deleteRow = id => {
        const idx = this.rows.findIndex(row => row.id === id);
        this.rows = [...this.rows.slice(0, idx), ...this.rows.slice(idx + 1)]
    }
    addBig = () => {
        this.rows = buildData(10000)
    }
    append = () => {
        this.rows = [...this.rows, ...buildData(1000)]
    }
    update = () => {
        for (let i=0;i<this.rows.length;i+=10) {
            this.rows[i].label += "!!! "
        }

        this.rows = [...this.rows]
    }

    @State count = -1

    Body() {
        h1('DLightJS-"keyed"')
        div {
            button("Create 1,000 rows")
                .onclick(this.addRows)
        }
        div {
            button("Create 10,000 rows")
                .onclick(this.addBig)
        }
        div {
            button("Append 1,000 rows")
                .onclick(this.append)
        }
        div {
            button("Update every 10th rows")
                .onclick(this.update)
        }
        div {
            button("Clear")
                .onclick(this.clearRows)
        }
        div {
            button("Swap Rows")
                .onclick(this.swapRows)
        }

        div {
            table {
                For(let {id,label} of this.rows) {
                    Row({id, label})
                        .deleteRow(this.deleteRow)
                        .selectRow(this.selectRow)
                        .className(this.selectIdx === id ? "danger" : "")
                }
            }
        }
    }
}
// ------------------------------
```

[Codesandbox-jsd](https://codesandbox.io/p/sandbox/dlight-benchmark-14ytuc)

?We've already built our benchmark into `codesandbox/dist/index.html` and copied [vanilla-js implementation](https://github.com/krausest/js-framework-benchmark/tree/master/frameworks/non-keyed/vanillajs) into `codesandbox/dist/vanillajs.html` . Download them and test performance by yourself and see how fast dlight is!