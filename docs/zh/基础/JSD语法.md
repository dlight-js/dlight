# JSD语法

# 总览

```typescript
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
  `this is a text node too, with ${this.anyMessage}`
  _("this is an expression")
}
...
```

# 