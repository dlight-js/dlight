# DLight

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
To create a new dlight.js project, you can use the create-dlightjs CLI package, which provides a quick and easy way to set up a new project with all the necessary files and dependencies. The latest version of dlight.js is installed by default using Vite. If you prefer to use a different project tooling, such as Parcel or any other tool that supports Babel, you can use the `babel-preset-dlight` preset to build a dlight.js project. To create a new dlightjs project, simply run the following command in your terminal:
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
// ~> Name.js
import { View } from "@dlightjs/dlight"

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
// ~> Name.js
import { View } from "@dlightjs/dlight"

class Name extends View {
  name = "John"

  willMount() {
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
// ~> DoubleCount.js
import { View } from "@dlightjs/dlight"

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
// ~> HelloWorld.js
import { View } from "@dlightjs/dlight"

class HelloWorld extends View {
  Body() {
    h1("hello world")
  }
}

export default HelloWorld
```
### Styling
```js
// ~> CssStyle.js
import { View } from "@dlightjs/dlight"
import "./style.css"

class CssStyle extends View {
  Body() {
    h1("I am red")
      .className("title")
    button("I am a button")
      .style({
        fontSize: "10rem"
      })
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
// ~> Colors.js
import { View } from "@dlightjs/dlight"

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
// ~> Counter.js
import { View } from "@dlightjs/dlight"

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
// ~> InputFocused.js
import { View } from "@dlightjs/dlight"

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
// ~> TrafficLight.js
import { View } from "@dlightjs/dlight"

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
      .onclick(this.nextLight)
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
// ~> PageTitle.js
import { View } from "@dlightjs/dlight"

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
// ~> Time.js
import { View } from "@dlightjs/dlight"

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
// ~> App.js
import { View } from "@dlightjs/dlight"
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
// ~> UserProfile.js
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
// ~> App.js
import { View } from "@dlightjs/dlight"
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
      .onYes(this.onAnswerYes)
      .onNo(this.onAnswerNo)
    p(`${this.canCome ? "😀" : "😥"}`)
      ._fontSize("50px")
  }
}

export default App
```
```js
// ~> AnswerButton.js
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
// ~> App.js
import { View } from "@dlightjs/dlight"
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
// ~> FunnyButton.js
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
// ~> App.js
import { View } from "@dlightjs/dlight"
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
// ~> FunnyButton.js
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
// ~> App.js
import { View } from "@dlightjs/dlight"
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
      .updateUsername(this.updateUsername)
    {
      UserProfile()
    }
  }
}

export default App
```
```ts
// ~> UserProfile.js
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
// ~> InputHello.js
import { View } from "@dlightjs/dlight"

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
// ~> IsAvailable.js
import { View } from "@dlightjs/dlight"

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
// ~> PickPill.js
import { View } from "@dlightjs/dlight"

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
      .onchange(this.handleChange)
    label("Blue pill")
      .htmlFor("blue-pill")
    input(this.text)
      .id("red-pill")
      .type("radio")
      .checked(this.picked === "red")
      .onchange(this.handleChange)
    label("Red pill")
      .htmlFor("red-pill")
  }
}

export default PickPill
```
### Select
```js
// ~> ColorSelect.js
import { View } from "@dlightjs/dlight"

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
// ~> App.js
import { View } from "@dlightjs/dlight"

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
// ~> App.js
import { View } from "@dlightjs/dlight"
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
// ~> Router.js
import { View } from "@dlightjs/dlight"

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
// ~> Routing.js
import { View } from "@dlightjs/dlight"
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

JSD is similar to other front-end(other than web) frameworks like [SwiftUI](https://developer.apple.com/xcode/swiftui/) or [Jetpack Compose](https://developer.android.com/jetpack/compose) or [QT quick](https://doc.qt.io/qt-6/qtquick-index.html) in that it offers a declarative approach to building UI components. In fact, many platforms are moving away from using XML to build user interface(even though they're based on XML like QT and Jetpack) because XML is designed primarily for machine readability, rather than human readability.

Here's a quick example of what jsd supports:
```js
...
Body() {
  // text node
  "plain text node"
  `this is text node too, ${this.anyMessage}`
  // html node
  div("this will auto set this div's inner text")
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
  // custom node
  MyCustomComponent()
      .firstProp("pass prop like this")
  MyComponentWithSlot()
  {
    ChildComponent()
  }
  // conditional
  if (this.toggle) {
    div("hello")
  } else if (this.ok) {
    span("ok")
  } else {
    "all wrong"
  }
  // loop
  for (const apple of this.apples) {
    div(apple)
  }
  for (const { apple, id } of this.apples) {
    div(apple)
      .id(`apple-${id}`)
  }
  // expression
  _("this is expression")
  _(this._$children) // _ accepts (string | number | DLNode | DLNode[]), here `this._$children` is of type DLNode[]
}
...
```
## Reactivity

In Dlight, reactivity is **simple and efficient**!
