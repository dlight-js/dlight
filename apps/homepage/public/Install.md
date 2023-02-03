# Quick start

1. Use CLI to build a dlight app. (This feature is still in development.)

``` shell
npm install -g @dlightjs/cli
create-dlight-app my-first-dlight-app
```

2. Clone this repo https://github.com/dlight-js/dlight-vite-template for a quick start.
3. 🌟 Play around in [codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-quickstart-4tgogd?file=%2Fpackage.json)

## Render

Mount your dlight component to any html element with id.

```typescript
import {render} from "@dlightjs/dlight"
import {MyComp} from "./MyComp.jsx"

render("app", new MyComp())
```
