import { execSync } from "child_process"
import { writeFileSync, readFileSync } from "fs"

execSync("./node_modules/.bin/babel --extensions .ts src --out-dir lib  --out-file-extension .ts", { stdio: "inherit" })

const filename = "tsup.config.ts"
const tsupconfig = readFileSync(filename, "utf-8")
writeFileSync(filename, tsupconfig.replace(/src/g, "lib").replace("dts: true,", ""), "utf-8")

try {
  execSync("tsup --sourcemap", { stdio: "inherit" })
} catch {}

writeFileSync(filename, tsupconfig, "utf-8")

try {
  execSync("tsup --dts-only --sourcemap", { stdio: "inherit" })
} catch {}

execSync("rm -rf lib", { stdio: "inherit" })
