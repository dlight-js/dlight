import fs from "fs"
import path from "path"

function template(content, name) {
  return `import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ${name} {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("${content}")
      .name("${name}")
  }
}

export default ${name} as Pretty as Typed<DLightIconType, HTMLSpanElement>
`
}

function getSVGContent(string) {
  return string.replace(/^.+?>(.+?)<\/svg>$/, "$1").replace(/"/g, "\\\"")
}

function firstCapital(string) {
  return string[0].toUpperCase() + string.slice(1)
}

function parseName(string, type) {
  const name = string.replace(".svg", "").split("_").map(word => firstCapital(word)).join("") + firstCapital(type)
  if (/^[0-9]/.test(name[0])) return `Icon${name}`
  return name
}

function go(type) {
  const dirPath = `./assets/${type}`
  const targetDirPath = `./src/${type}`
  fs.mkdirSync(targetDirPath)
  const files = fs.readdirSync(dirPath)
  const names = []
  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const data = fs.readFileSync(filePath, "utf-8")
    const name = parseName(file, type)

    if (names.map(name => name.toLowerCase()).includes(name.toLowerCase())) continue

    const code = template(getSVGContent(data), name)

    fs.writeFileSync(`${targetDirPath}/${name}.view.ts`, code)
    console.log(`${name} done!`)
    names.push(name)
  }

  const code = names.map(name => (
  `export { default as ${name} } from "./${name}.view"\n`
  )
  ).join("")
  fs.writeFile(`${targetDirPath}/index.ts`, code, () => {})
  console.log("index done!")
}
for (const type of ["filled", "outlined", "round", "sharp", "twoTone"]) {
  go(type)
}
