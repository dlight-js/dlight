# @dlightjs/emotion

融合`@emotion/css` 后的dlightjs工具包，提供两种使用方式

# CSS

同原生`@emotion/css` 一样使用

```typescript
import {css} from "@dlightjs/emotion"

class MyComp extends View  {
    Body() {
      div("hello")
        .className(css`
          width: 100px;
          background-color: red;
        `)
    }
}
```

```typescript
import {css} from "@dlightjs/emotion"

const MyCompBoxCss = css`
  width: 100px;
  height: 100px;
`

const MyCompColorCss = css`
   background-color: yellow;
   color: red;
`

class MyComp extends View  {
    Body() {
      div("hello")
        .className(MyCompBoxCss)
        .className(MyCompColorCss)
    }
}
```

# Styled

同 react 中的 styled-component 用法一致

## HTMLNode

```typescript
import {styled} from "@dlightjs/emotion"


const MyBeautifulDiv = styled.div`
  width: 100px;
  background-color: red;
`

class MyComp extends View  {
    Body() {
      MyBeautifulDiv("hello")
    }
}
```

## CustomNode

```typescript
import {styled} from "@dlightjs/emotion"

class MyComp extends View  {
    @Prop className = required
    Body() {
      div("hello")
        .className(this.className)
    }
}

const MyBeautifulWComp = styled(MyComp)`
  width: 100px;
  background-color: red;
`

class MyComp extends View  {
    Body() {
      MyBeautifulWComp()
    }
}
```

## 传递参数

和styled-component 用法一致

```typescript
import {styled} from "@dlightjs/emotion"


const MyBeautifulWidthDiv = styled.div`
  width: ${props => props.width};
  background-color: red;
`

class MyComp extends View  {
    Body() {
      MyBeautifulWidthDiv("hello")
        .width("200px")
    }
}
```


