const fs = require("fs")

const template = 

fs.readFile("./assets/filled/1k.svg", "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})
