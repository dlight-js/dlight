# DLight

EN | [中文](../../../docs/zh/README-dlight.md)

# Introduction
## Overview
Welcome to the official documentation for dlight.js, a modern and lightweight library for rendering web front-end UI elements. Developed with simplicity and performance in mind, dlight.js allows developers to quickly create high-quality user interfaces with minimal overhead.

This document aims to provide a comprehensive guide to using dlight.js, covering everything from installation and basic usage to advanced topics. Whether you're a seasoned web developer or just getting started, this guide will help you get up and running with dlight.js and make the most of its features.

We'll start by giving an overview of the library and its goals, before diving into the specifics of how to use it in your projects. Along the way, we'll cover best practices, troubleshooting tips, and other resources to help you get the most out of dlight.js.

So, whether you're building a simple website or a complex web application, we hope this guide will help you create beautiful, responsive, and user-friendly interfaces using dlight.js. Let's get started!
## Target audience
The dlight.js library is targeted towards developers who are looking for a modern and flexible library for rendering web front-end UI elements. This includes developers who are interested in exploring new and innovative approaches to UI rendering, and who may be familiar with frameworks like SwiftUI and Jetpack Compose.

Developers who are interested in dlight.js may be looking for an alternative to traditional XML-based coding styles like JSX, and may be interested in exploring a more expressive and intuitive way of creating UI elements. They may also be interested in the modularity and flexibility of the library, which allows them to easily customize and extend its components and styling.

The target audience for dlight.js includes developers who value performance and simplicity, and who want to be able to easily create high-quality user interfaces without having to write a lot of code. They may also be interested in accessibility and want to ensure that their web interfaces are usable by all users.


# Getting Started
## Installation
To create a new dlight.js project, you can use the create-dlightjs CLI package, which provides a quick and easy way to set up a new project with all the necessary files and dependencies. The latest version of dlight.js is installed by default using Vite. If you prefer to use a different project tooling, such as Parcel or any other tool that supports Babel, you can use the `babel-plugin-dlight` plugin or `babel-preset-dlight` preset to build a dlight.js project. To create a new dlightjs project, simply run the following command in your terminal:
```shell
npm create dlightjs@latest
```
And follow the guidance
```
> ? 💻 Your project name (my-dlight-app)
> ? 🥑 Language support
  ❯ Javascript
    Typescript
> ? 📦 Packages to be installed
  ❯◉ @dlightjs/components
  ◯ @dlightjs/decorators
  ◯ @dlightjs/emotion
> ? 🍲 Package manager
  ❯ NPM
    PNPM
    YARN
    NONE
```
If you choose a package manager other than 'NONE' in the selector, dlight.js will automatically install the required dependencies for you. Once the installation is complete, you should see this and you can start coding in dlight.js with delight!
``` shell
🎉 All done!

     /DDDDDDD  /DD       /DD           /DD         /DD    
    | DD__  DD| DD      |__/          | DD        | DD    
 /:D| DD  \ DD| DD       /DD  /DDDDDD | DDDDDDD  /DDDDDD  
|__/| DD  | DD| DD      | DD /DD__  DD| DD__  DD|_  DD_/  
    | DD  | DD| DD      | DD| DD  \ DD| DD  \ DD  | DD    
 /:D| DD  | DD| DD      | DD| DD  | DD| DD  | DD  | DD /DD
|__/| DDDDDDD/| DDDDDDDD| DD|  DDDDDDD| DD  | DD  |  DDDD/
    |_______/ |________/|__/ \____  DD|__/  |__/   \___/  
                             /DD  \ DD                    
                            |  DDDDDD/ 
                             \______/                                               

:D Happy coding in DLight!
```
## Run project
After your installation, you can run `npm run dev`(or pnpm or yarn) in your project folder. This command starts a development server that allows you to preview and test your dlight.js application in a web browser. To view your dlight.js application in the browser, simply open your preferred browser and navigate to http://localhost:4300. You should see your application running and ready for testing.

## File structure
When you create a new dlight.js project using the CLI tool, it sets up a file structure that is similar to a Vite project. The file structure consists of the following files and directories:
```text
- src
  - App.view.ts    // codes for AppView
  - index.ts       // js entry and mount the AppView into html
- index.html       // html entry
- package.json
- vite.config.ts   // use vite-plugin-dlight in vite
```

# Examples
Writing components in Dlight is simple and straightforward. Small focused components are the basic building blocks in Dlight, making apps composable, reusable and modular. We follow the examples of https://component-party.dev to make it easier for developers that are familar with other front-end libraries to migirate to dlight.
## Reactivity
### Declare state
```js
// ~> Name.view.js
import DLight, { View } from "@dlightjs/dlight"

class Name extends View {
  name = "John"

  Body() {
    h1(this.name)
  }
}

export default Name
```
### Update state
```js
// ~> Name.view.js
import DLight, { View } from "@dlightjs/dlight"

class Name extends View {
  name = "John"

  beforeInit() {
    this.name = "Jane"
  }

  Body() {
    h1(this.name)
  }
}

export default Name
```
### Computed state
```js
// ~> DoubleCount.view.js
import DLight, { View } from "@dlightjs/dlight"

class DoubleCount extends View {
  count = 10
  doubleCount = this.count * 2

  Body() {
    div(this.doubleCount)
  }
}

export default DoubleCount
```

## Templating
### Minimal template
```js
// ~> HelloWorld.view.js
import DLight, { View } from "@dlightjs/dlight"

class HelloWorld extends View {
  Body() {
    h1("hello world")
  }
}

export default HelloWorld
```
### Styling
```js
// ~> CssStyle.view.js
import DLight, { View } from "@dlightjs/dlight"
import "./style.css"

class CssStyle extends View {
  Body() {
    h1("I am red")
      .className("title")
    button("I am a button")
      ._fontSize("10rem")
  }
}

export default CssStyle
```
```css
/** ~> style.css */
.title {
  color: red;
}
```
### Loop
```js
// ~> Colors.view.js
import DLight, { View } from "@dlightjs/dlight"

class Colors extends View {
  colors = ["red", "green", "blue"]

  Body() {
    ul()
    {
      for (const color of this.colors) {
        li(color)
      }
    }
  }
}

export default Colors
```
### Event click
```js
// ~> Counter.view.js
import DLight, { View } from "@dlightjs/dlight"

class Counter extends View {
  count = 0

  Body() {
    p(`Counter: ${this.count}`)
    button("+1")
      .onclick(() => {
        this.count++
      })
  }
}

export default Counter
```
### Dom ref
```js
// ~> InputFocused.view.js
import DLight, { View } from "@dlightjs/dlight"

class InputFocused extends View {
  inputElement

  didMount() {
    this.inputElement.focus()
  }

  Body() {
    input()
      .type("text")
      .element(this.inputElement)
  }
}

export default InputFocused
```
### Conditional
```js
// ~> TrafficLight.view.js
import DLight, { View } from "@dlightjs/dlight"

const TRAFFIC_LIGHTS = ["red", "orange", "green"]

class TrafficLight extends View {
  lightIndex = 0
  light = TRAFFIC_LIGHTS[this.lightIndex]

  nextLight() {
    if (this.lightIndex + 1 > TRAFFIC_LIGHTS.length - 1) {
      this.lightIndex = 0
    } else {
      this.lightIndex++
    }
  }

  Body() {
    button("Next light")
      .onclick(this.nextLight.bind(this))
    p(`Light is: ${this.light}`)
    p()
    {
      "You must"
      if (this.light === "red") {
        span("STOP")
      } else if (this.light === "orange") {
        span("SLOW DOWN")
      } else if (this.light === "green") {
        span("GO")
      }
    }
  }
}

export default TrafficLight
```
## Lifecycle
### On mount
```js
// ~> PageTitle.view.js
import DLight, { View } from "@dlightjs/dlight"

class PageTitle extends View {
  pageTitle = ""

  didMount() {
    this.pageTitle = document.title
  }

  Body() {
    p(`Page title is ${this.pageTitle}`)
  }
}

export default PageTitle
```
### On unmount
```js
// ~> Time.view.js
import DLight, { View } from "@dlightjs/dlight"

class Time extends View {
  time = new Date().toLocaleTimeString()
  timer

  didMount() {
    this.timer = setInterval(() => {
      this.time = new Date().toLocaleTimeString()
    }, 1000)
  }

  willUnmount() {
    clearInterval(this.timer)
  }

  Body() {
    p(`Current time: ${this.time}`)
  }
}

export default Time
```
## Component composition
### Props
```js
// ~> App.view.js
import DLight, { View } from "@dlightjs/dlight"
import UserProfile from "./UserProfile"

class App extends View {
  Body() {
    UserProfile()
      .name("John")
      .age(20)
      .favouriteColors(["green", "blue", "red"])
      .isAvailable(true)
  }
}

export default App
```
```ts
// ~> UserProfile.view.js
class UserProfile extends View {
  @Prop name = ""
  @Prop age = null
  @Prop favouriteColors = []
  @Prop isAvailable = false

  Body() {
    p(`My name is ${this.name}!`)
    p(`My age is ${this.age}!`)
    p(`My favourite colors are ${this.favouriteColors.join(", ")}!`)
    p(`I am ${this.isAvailable ? "available" : "not available"}`)
  }
}

export default UserProfile
```
### Emit to parent
```js
// ~> App.view.js
import DLight, { View } from "@dlightjs/dlight"
import AnswerButton from "./AnswerButton.view"
class App extends View {
  canCome = true

  onAnswerNo() {
    this.canCome = false
  }

  onAnswerYes() {
    this.canCome = true
  }

  Body() {
    p("Are you happy?")
    AnswerButton()
      .onYes(this.onAnswerYes.bind(this))
      .onNo(this.onAnswerNo.bind(this))
    p(`${this.canCome ? "😀" : "😥"}`)
      ._fontSize("50px")
  }
}

export default App
```
```js
// ~> AnswerButton.view.js
class AnswerButton extends View {
  @Prop onYes
  @Prop onNo

  Body() {
    button("yes")
      .onclick(this.onYes)
    button("NO")
      .onclick(this.onNo)
  }
}

export default AnswerButton
```
### Slot
```js
// ~> App.view.js
import DLight, { View } from "@dlightjs/dlight"
import FunnyButton from "./FunnyButton.view"

class App extends View {
  Body() {
    FunnyButton()
    {
      "Click me!"
    }
  }
}

export default App
```
```js
// ~> FunnyButton.view.js
class FunnyButton extends View {
  Body() {
    button()
      .style({
        background: "rgba(0, 0, 0, 0.4)",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "30px",
        border: "2px solid #fff",
        margin: "8px",
        transform: "scale(0.9)",
        boxShadow: "4px 4px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s",
        outline: "0"
      })
    {
      _(this._$children)
    }
  }
}

export default FunnyButton
```
### Slot fallback
```js
// ~> App.view.js
import DLight, { View } from "@dlightjs/dlight"
import FunnyButton from "./FunnyButton"

class App extends View {
  Body() {
    FunnyButton()
    {
      "I got content!"
    }
    FunnyButton()
  }
}

export default App
```
```js
// ~> FunnyButton.view.js
class FunnyButton extends View {
  Body() {
    button()
      .style({
        background: "rgba(0, 0, 0, 0.4)",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "30px",
        border: "2px solid #fff",
        margin: "8px",
        transform: "scale(0.9)",
        boxShadow: "4px 4px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s",
        outline: "0"
      })
    {
      if (this._$children.length === 0) {
        span("No content found")
      } else {
        _(this._$children)
      }
    }
  }
}

export default FunnyButton
```
### Context
```js
// ~> App.view.js
import DLight, { View } from "@dlightjs/dlight"
import UserProfile from 'UserProfile.view'

class App extends View {
  user = {
    id: 1,
    username: "unicorn42",
    email: "unicorn42@example.com"
  }

  updateUsername(newUserName) {
    this.user = { ...this.user, userName: newUserName }
  }

  Body() {
    h1(`Welcome back, ${this.user.userName}`)
    env()
      .user(this.user)
      .updateUsername(this.updateUsername.bind(this))
    {
      UserProfile()
    }
  }
}

export default App
```
```ts
// ~> UserProfile.view.js
class UserProfile extends View {
  @Env user
  @Env updateUsername

  Body() {
    div()
    {
      h2("My Profile")
      p(`Username: ${this.user.username}`)
      p(`Email: ${this.user.email}`)
      button("Update username to Jane")
        .onclick(() => this.updateUsername("Jane"))
    }
  }
}

export default UserProfile
```
## Form Input
### Input text
```js
// ~> InputHello.view.js
import DLight, { View } from "@dlightjs/dlight"

class InputHello extends View {
  text = "Hello world"

  Body() {
    p(this.text)
    input()
      .value(this.text)
      .oninput(e => {
        this.text = e.target.value
      })
  }
}

export default InputHello
```
### Checkbox
```js
// ~> IsAvailable.view.js
import DLight, { View } from "@dlightjs/dlight"

class IsAvailable extends View {
  isAvailable = false

  Body() {
    input(this.text)
      .type("checkbox")
      .id("is-available")
      .checked(this.isAvailable)
      .onchange(() => { this.isAvailable = !this.isAvailable })
    label()
      .htmlFor("is-available")
  }
}

export default IsAvailable
```
### Radio
```js
// ~> PickPill.view.js
import DLight, { View } from "@dlightjs/dlight"

class PickPill extends View {
  picked = "red"

  handleChange(event) {
    this.picked = event.target.value
  }

  Body() {
    div(`Picked: ${this.picked}`)
    input(this.text)
      .id("blue-pill")
      .type("radio")
      .checked(this.picked === "blue")
      .onchange(this.handleChange.bind(this))
    label("Blue pill")
      .htmlFor("blue-pill")
    input(this.text)
      .id("red-pill")
      .type("radio")
      .checked(this.picked === "red")
      .onchange(this.handleChange.bind(this))
    label("Red pill")
      .htmlFor("red-pill")
  }
}

export default PickPill
```
### Select
```js
// ~> ColorSelect.view.js
import DLight, { View } from "@dlightjs/dlight"

const colors = [
  { id: 1, text: "red" },
  { id: 2, text: "blue" },
  { id: 3, text: "green" },
  { id: 4, text: "gray", isDisabled: true }
]

class ColorSelect extends View {
  selectedColorId = 2

  Body() {
    select()
      .value(this.selectedColorId)
      .onchange(e => { this.selectedColorId = e.target.value })
    {
      for (const { id, text, isDisabled } of colors) {
        option(text)
          .value(id)
          .disabled(isDisabled)
      }
    }
  }
}

export default ColorSelect
```
## Webapp features
### Render app
```html
// ~> index.html
<!DOCTYPE html>
<html>
  <body>
    <div id="app"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```
```js
// ~> App.view.js
import DLight, { View } from "@dlightjs/dlight"

class App extends View {
  Body() {
    h1("Hello world")
  }
}

export default App
```
```js
import { render } from "@dlightjs/dlight"
import App from "./App.view"

render("app", App)
```
### Fetch data
```js
// ~> App.view.js
import DLight, { View } from "@dlightjs/dlight"
import fetchUser from "./fetchUser"

class App extends View {
  isLoading
  error
  users

  willMount() {
    fetchUser("users")
  }

  Body() {
    if (this.isLoading) {
      p("Fetching users...")
    } else if (this.error) {
      p("An error occured while fetching users")
    } else if (this.users) {
      ul()
      {
        for (const { name, picture } of this.users) {
          li()
          {
            img()
              .src(picture.thumbnail)
              .alt("user")
            p(`${name.first} ${name.last}`)
          }
        }
      }
    }
  }
}

export default App
```
```js
// ~> fetchUsers.js
export default async function fetchUsers(dataKey = "data", errorKey = "error", isLoadingKey = "isLoading") {
  this[isLoadingKey] = true
  try {
    const response = await fetch("https://randomuser.me/api/?results=3")
    const { results: users } = await response.json()
    this[dataKey] = users
    this[errorKey] = null
  } catch (err) {
    this[dataKey] = null
    this[errorKey] = err
  }
  this[isLoadingKey] = false
}
```
### Router link
```ts
// ~> Router.view.js
import DLight, { View } from "@dlightjs/dlight"

class Router extends View {
  @Env navigator

  Body() {
    ul()
    {
      li()
      {
        a("Home")
          .onclick(() => {
            this.navigator.to("/")
          })
      }
      li()
      {
        a("About us")
          .onclick(() => {
            this.navigator.to("/about")
          })
      }
    }
  }
}

export default Router

```
### Routing
```js
// ~> Routing.view.js
import DLight, { View } from "@dlightjs/dlight"
import { RouterSpace, Route } from "@dlightjs/components"

class Routing extends View {
  Body() {
    RouterSpace()
    {
      Route("/")
      {
        HomeView()
      }
      Route("/about")
      {
        AboutUsView()
      }
    }
  }
}

export default Routing
```








---
For example, a simple Counter component in Dlight may look like this:
```js
// ~> Counter.view.js
import DLight, { View } from "@dlightjs/dlight"

class CounterView extends View {
  count = 0

  Body() {
    h2(this.count)
    button("+")
      .onclick(() => {
        this.count++
      })
    button("-")
      .onclick(() => {
        this.count--
      })
  }
}
```
This code defines a CounterView class extending from the View class from the dlight, which makes it a DLight component. Inside this component, we've declared a member called `count` and used in `h2(this.count)`. So dlight will listen to the `count` variable and whenever you change it by clicking the button or anything else inside the codes, dlight will notice the change and then change and rerender the h2 element only.


# Why DLight.js?
DLight.js is a modern, lightweight, and efficient UI rendering library that offers several benefits to developers. Here are some of the key reasons why you may want to choose DLight.js for your next UI project.

## Coding style
DLight.js offers several unique features to make development easier and more efficient. Here are two main code styling differences between DLight.js and other popular UI rendering libraries:

### Class Components Instead of Functional Components or Templates
DLight.js uses class components instead of functional components or templates. This is because DLight.js is fully based on the Model-View-ViewModel (MVVM) architecture, which separates the view and the logic of an application. In the MVVM pattern, the view is responsible for rendering the user interface, while the ViewModel is responsible for handling the application logic.

With class components in DLight.js, you declare a class member, and the framework handles the rest for you. This approach offers several advantages, including:

* Flexibility: Class components are more flexible than templates because they allow you to use any JavaScript expression in your code. This makes it easier to create complex UIs that are dynamic and responsive.

* Reusability: Class components can be easily reused across different parts of your application, making it easier to maintain and update your code.

* Separation of Concerns: Using class components in DLight.js makes it easier to separate the concerns of the view and the logic. By separating the view and the logic, it is easier to maintain and update your code. You can focus on building high-quality user interfaces without having to worry about the underlying implementation details.


### JSD (JavaScript-based DSL)
DLight.js also offers a new domain-specific language (DSL) called JSD (JavaScript-based DSL). JSD is a lightweight and intuitive language that allows you to express your UI components in a more declarative and concise way.

With JSD, you can define your UI components using simple JavaScript objects instead of writing complex XML scripts(like html or jsx). This makes it easier to create and maintain your UI components, and it also makes your code more readable and easier to understand.

Some of the benefits of using JSD include:
* Simplicity: JSD is a simple and intuitive language that is easy to learn and use, even for developers who are new to DLight.js.
* Declarative Syntax: JSD uses a declarative syntax that makes it easier to understand how your UI components are structured and how they interact with each other.

JSD is similar to other front-end(other and web) frameworks like [SwiftUI](https://developer.apple.com/xcode/swiftui/) or [Jetpack Compose](https://developer.android.com/jetpack/compose) or [QT quick](https://doc.qt.io/qt-6/qtquick-index.html) in that it offers a declarative approach to building UI components. In fact, many platforms are moving away from using XML to build user interface(even though they're based on XML like QT and Jetpack) because XML is designed primarily for machine readability, rather than human readability.



---
B. Basic usage
C. Examples

III. Components
A. Overview of available components
B. Component API Reference
C. Examples and use cases

IV. Styling
A. Overview of supported styling options
B. Style API Reference
C. Examples and use cases

V. Events
A. Overview of available events
B. Event API Reference
C. Examples and use cases

VI. Best Practices
A. Tips for optimizing performance
B. Guidelines for accessibility
C. Best practices for using dlight.js with other libraries and frameworks

VII. Troubleshooting
A. Common issues and solutions
B. Debugging tips
C. Support and resources

VIII. Conclusion
A. Summary of key points
B. Future developments and updates
C. Call to action (e.g. contribute to the project, provide feedback)

I hope this outline gives you a good starting point for creating your document for the dlight.js library. Good luck!


## Render

Mount your dlight component to any **html element with an id**.

```typescript
import {render} from "@dlightjs/dlight"
import {MyComp} from "./MyComp.jsd"

render("app", MyComp)
```

## Write your own component

First thing first, DLight is not using template/functional components. 
It uses **Class component** instead, but not like React Class component. 
We are not fans of writing nesting logic inside your view and want to **split the view and logic**, 
so we choose not to use functional component with its returned value as view. In the meantime, 
we want to make our component **as flexible as possible**,
so here we comes the DLight class component. 

We realize there's one big burden to write a class component -- 'this'. 
You have to use this.xxx to access a class property. 
So **currently we're building a babel plugin to 'eliminate this' in a class and auto find the binding object**. 
And now it's **done**!!

We offer a babel plugin called `babel-plugin-optional-this` for any js/ts code to eliminate the ugly `this`, e.g.:
```js
export class MyComp extends View {
  @State count = 0  

  Body() {
    div(this.count)
  }
}
```
now becomes:

```jsx
export class MyComp extends View {
  @State count = 0  

  Body() {
    div(count)
  }
}
````
(we've of course considered some scenarios like params of a function, a member expression.... So just don't hesitate to use it)
Enable it in dlight is pretty easy, in vite.config.ts, just replace:
```js
...
dlight()
...
```
with
```js
...
dlight({optionalThis: true})
...
```
Then you're all set! 

Let's go back to **Write your own component**

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
In the latest version of DLight.js, data binding is achieved through one-way data binding, which means that data flows in one direction, from the parent component to the child component. Prior to version 0.6.0, DLight.js used two-way data binding, which allowed data to flow in both directions between the parent and child components. However, this approach led to complex data passing logic and made it difficult to trace the flow of data through the application. This complexity could result in bugs and made it harder to maintain and update the code over time.
This is done through props. Dlight use decorator `@Prop` to identify that this specific class member is a prop.

For example:
```js
import DLight, { View } from "@dlightjs/dlight"

class MyOtherComp extends View {
  @Prop countProp 

  Body() {
    div(this.countProp)
      .id("other-comp")
  }
}

class MyComp extends View {
  count = 0

  Body() {
    button("+")
      .onclick(() => {
        this.count ++
      })
    button("-")
      .onclick(() => {
        this.count --
      })
    MyOtherComp()
      .countProp(this.count)
  }
}
```
In this code, we see two components: MyComp and MyOtherComp. The MyComp component has a count property that is used to keep track of a number like Your First Component code above.

The MyOtherComp component is a child component of MyComp, and it receives the countProp property as a prop. The countProp property in MyOtherComp is marked with the @Prop decorator to indicate that it is a prop. When MyComp renders the MyOtherComp component, it passes the count property as the value of the countProp prop using the syntax `.countProp(this.count)`.
  
## Reactivity
```

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
  div()
  {
    button("first child")
      .onclick(() => {
        console.log("write dot prop")
      })
    div()
      .id("second-child-div")
      .innerText("you can also set prop like this")
  }
  "plain text node"
  `this is text node too, ${this.anyMessage}`
  _("this is expression")
}
...
```

### tag and node

We call strings like `div` / `MyOtherComp` / `If` in `Body` as tags. And it will compile to a node in the transpiler stage. We have these following protocols.

1. Tag that starts with a lowercase letter is a html tag, e.g. `div` `button`

2. Tag that starts with an uppercase letter is a custom component tag, e.g. `MyComp` `MyOtherComp`

3. Tag that starts with a lowercase letter maybe an internal tag.

   Current internal tag includes: `if` `else if` `else` `for` `env` `_`

We also have invisible tag: strings wrapped with `"` \ `'` \ ` are called textNode. It's created by `document.createTextNode()`

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

In jsd, we use `_` to identifier expression. And inside the expression, we use `do {}` to mark that the content inside it is a sub-block of jsd Body. e.g.

```jsx
...
Body() {
  div()
  {
    _(!console.log("expression just like you used to write") && "display this sentence")
    _(this.show && do {
      div("will show if this.show is true")
    })
  }
}
...
```

### prop

Two ways to set a prop

1. ```js
   TagName()
     .prop1("hello")
     .prop2("world")
   ```

2. ```js
   TagName("your _$content prop")
   ```

For different tags, prop means different things.

1. Html tag

   - 1 prop means html element attributes.

     e.g. `div("hello").id("hello-div")` => `el.id = "hello-div"`

   - 1 prop that starts with a "_" is a shorthand of style attributes.

     e.g. `div("hello")._color("red")` => `el.style.color = "red"`

   - 2 prop sets html element innerText and will be replaced by its children.

     e.g. `div("hello")` => `el.style.innerText = "hello"`

     ```js
     div("this will not show") {
       div("because I'm its child, I overwrite its innerText")
     }
     ```

2. Custom component

   - 1 prop means custom component props as `Quick start - pass a prop` section describes.

   - 2 prop set the custom component prop named `_$content`

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

- Use **@State** to mark a class member as **reactive variable**. Whenever the variable is set, all the attributes in a html element that uses this variable will recalculate the attribute(🌟not rerender the element, it has much more fine granularity!)

- **Two exceptions** 
  
  1. If you're using an **arrow function** to wrap this variable, dlight will **consider it as a callback** like `onclick`, which has no need to reset this attribute, so the reactivity will be dropped in this attribute. If somehow you still want dlight to listen inside it, use `function` instead of `arrow function`.
  
     e.g. `() => { console.log(this.count) }` => won't be listened

     `function() { console.log(this.count) }` => will be listened
  
  2. If you're setting a state, we won't listen to it because it will cause a dep loop.
  
     For example, imagine you're using React, `this.count = 1` should be `setCount(1)`, so we won't treat count as a reactive variable. Another case: `this.count = this.count + 1`, in React it should be `setCount(prev => prev+1)`. Also, we won't let DLight track it. 
  
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
       return count
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
    div()
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
    MySubComp()
    {
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

## Sub views

Build reusable subviews inside your components. Props inside @View will automatically be reactive.

```js
class MyComp extends View {
  @View
  MyButton({id}) {
    button(`I am button ${id}`)
  }
  Body() {
    for (let i of [1,2,3]) {
      this.MyButton()
      	.id(i)
    }
  }
}
```

## Complex tag

Force a expression to be a custom tag.

```js
class MySubComp extends View {
  Body() {
    "hello"
  }
}

class MyComp extends View {
  myTagObject = {
    getTag: () => MySubComp
  }
  Body() {
    tag(this.myTagObject.getTag())()
  }
}
```

Force a expression to be a html tag.

```js
class MyComp extends View {
  myTagObject = {
    getTag: () => "span"
  }
  Body() {
    html(this.myTagObject.getTag())()
  }
}
```



# Internal tags

## Array

1. You can first use unoptimized array map-out to create an array of elements, but once the array is changed even with a single item of it, the whole array of elements will be removed and recreated. So don't use it **unless it's a fixed array or you know what you're doing**.

   ```jsx
   ...
   Body() {
     div()
     {
       _(this.array.map(item => do {
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
     div()
     {
       for (let item of this.array) {
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
     div()
     {
       for (let {id, item} of this.array) { [id]
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
     div()
     {
       if (this.show) {
         "show me"
       } else if (this.alsoShow) {
         "also show me"
       } else {
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
    Env()
    	.myMessage("use me anywhere inside this environment") 
    {
      MySubComp1()
      MySubComp2()
    }
  }
}
```
