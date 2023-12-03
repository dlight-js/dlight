import { execSync } from "child_process"
import { writeFileSync, readFileSync } from "fs"

const target = process.argv[2]
const babelConfig = `./build-config/${target}.babelrc`
const tsupConfigFile = `./build-config/tsup.config.${target}.ts`
const tag = `temp-${Math.random().toString(32).slice(2, 8)}`

execSync(`./node_modules/.bin/babel --extensions .ts src --out-dir ${tag} --config-file ${babelConfig} --out-file-extension .ts`, { stdio: "inherit" })

const tsupconfig = readFileSync(tsupConfigFile, "utf-8")
writeFileSync(tsupConfigFile, tsupconfig.replace(/src/, tag), "utf-8")

try {
  execSync(`tsup --config ${tsupConfigFile}`, { stdio: "inherit" })
} catch {}

writeFileSync(tsupConfigFile, tsupconfig, "utf-8")

execSync(`rm -rf ${tag}`, { stdio: "inherit" })

if (target === "server") {
  // -- copy html to dist/server
  execSync("cp ./index.html ./dist/server/index.html", { stdio: "inherit" })
}
