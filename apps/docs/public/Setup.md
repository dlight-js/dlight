
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

  * jsx

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

   `<div id="mycomp" />` in `MyComp`  will change its innerText if `countPropState` in `MyOtherComp `changes.

  * jsx
  * *

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

  * jsd

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
