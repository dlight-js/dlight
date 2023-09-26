import fs from "fs"

const indexJsFilePath = "dist/index.js"
const addProcessEnvCode = "if(typeof process===\"undefined\")window.process={env:{}};"
fs.readFile(indexJsFilePath, "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const result = addProcessEnvCode + data
  fs.writeFile(indexJsFilePath, result, "utf8", (err) => {
    if (err) console.error(err)
  })
})

const indexCjsFilePath = "dist/index.cjs"
const replaceCode = /^"use strict";/g
const replaceProcessEnvCode = "\"use strict\";if(typeof process===\"undefined\")window.process={env:{}};"
fs.readFile(indexCjsFilePath, "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const result = data.replace(replaceCode, replaceProcessEnvCode)
  fs.writeFile(indexCjsFilePath, result, "utf8", (err) => {
    if (err) console.error(err)
  })
})
