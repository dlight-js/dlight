import fs from "fs"
import path from "path"

function template(content, name) {
  return `import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ${name} extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("${content}")
      .name("${name}")
  }
}

export default ${name} as any as Typed<DLightIconType>
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

const type = "outlined"

const dirPath = `./assets/${type}`
const targetDirPath = `./src/${type}`

const files = fs.readdirSync(dirPath)
const names = []
for (const file of files) {
  const filePath = path.join(dirPath, file)
  const data = fs.readFileSync(filePath, "utf-8")
  const name = parseName(file, type)

  if (names.map(name => name.toLowerCase()).includes(name.toLowerCase())) continue

  const code = template(getSVGContent(data), name)
  fs.writeFile(`${targetDirPath}/${name}.view.ts`, code, (err) => {
    if (err) {
      console.log(`${name} wrong!`)
      throw err
    }
    console.log(`${name} done!`)
  })
  names.push(name)
}

const code = names.map(name => (
`export { default as ${name} } from "./${name}.view"\n`
)
).join("")
fs.writeFile(`${targetDirPath}/index.ts`, code, () => {})
console.log("index done!")
