const Content = Symbol("_$dlContent")

// A couple of HTML tags to play around with; use `any` type for now
const div: any = () => {}
const button: any = () => {}

function component<T extends { new (...args: any[]): any }>(
  _cls: T
): ComponentFunction<InstanceType<T>> {
  return (() => {}) as any
}

// Example usage:
const Button = component(
  class {
    [Content]!: string
    declare forward: "class" | "onClick"
  }
)

Button("test")
  .class("bright")
  .onClick(() => console.log("ok"))

const NavLink = component(
  class {
    [Content]!: { label: string; href: string }

    // Declare a special value called 'forward' that is erased by typescript,
    // but whose type the transpiler records and uses to permit forwarding specific
    // properties.
    declare forward: "class" | "onClick"

    // Optional: add a getter for [Content]
    get content() {
      return this[Content]
    }

    body() {
      button(this.content.label)
        .onClick(() => {
          window.location.href = this.content.href
        })
        .forwardProps()
    }
  }
)

export const Nav = component(
  class {
    // Use the `static` qualifier to define static variables
    static elements: HTMLElement[] = []

    body() {
      div(() => {
        NavLink({ label: "Home", href: "/" })
        div("About")
        div("Sign In")
      }).class("flex gap-2")
    }
  }
)

type Chainable<T extends string> = {
  [K in T]: (arg: any) => Chainable<T>
}

// Utility type to extract the content type from a class
type ExtractContent<T> = T extends { [Content]: infer C } ? C : never

// Utility type to extract the forward keys
type ExtractForward<T> = T extends { forward: infer F extends string }
  ? F
  : never

// Defines the function signature: with or without arguments based on `[Content]`
type ComponentFunction<T> =
  ExtractContent<T> extends never
    ? () => Chainable<ExtractForward<T>>
    : (content: ExtractContent<T>) => Chainable<ExtractForward<T>>
