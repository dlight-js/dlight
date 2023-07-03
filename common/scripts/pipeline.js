const action = process.argv[2]
if (!action) process.exit()
const { execSync } = require("child_process")
const fs = require("fs")
const packageJson = fs.readFileSync("./package.json")
let { packages } = JSON.parse(packageJson)
const packageType = process.argv[3]

if (packageType) {
  packages = packages[packageType]
} else {
  packages = Object.values(packages).reduce((acc, arr) => [...acc, ...arr], [])
}
for (const packageName of packages) {
  const len = action.length + packageName.length + 24
  const dash = "-".repeat(len)
  console.log(`\x1b[35m┌${dash}┐\x1b[0m`)
  console.log(`\x1b[35m|    ${action}ing package ${packageName}....    |\x1b[0m`)
  console.log(`\x1b[35m└${dash}┘\x1b[0m`)
  execSync(`node ./common/scripts/${action}.js "./packages/${packageName}"`, { stdio: "inherit" })
}
