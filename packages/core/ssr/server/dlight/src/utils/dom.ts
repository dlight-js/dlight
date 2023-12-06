// @ts-ignore
import { JSDOM } from "jsdom"

const { document } = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + TS</title>
    <!--app-head-->
  </head>
  <body>
    <div id="app"><!--app-html--></div>
  </body>
</html>
`).window

const classPathMap: Record<string, string[]> = {}

export function addToClassPathMap() {
  if (!this._$filepath) return
  if (!classPathMap[this._$filepath!]) classPathMap[this._$filepath!] = []
  classPathMap[this._$filepath!].push(this._$id!)
}
const onEvents: string[] = []

export { document, classPathMap, onEvents }
