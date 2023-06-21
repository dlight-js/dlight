#!/usr/bin/env node
import { input, select, checkbox } from "@inquirer/prompts"
import { execSync } from "child_process"
import { dependencies, devDependencies } from "./dependency"
import { info, jsonify, logo, success } from "./utils"
import { fileURLToPath } from "node:url"
import path from "path"
import fs from "fs"

// ---- Get project info
const projectName = await input({
  message: "💻 Your project name",
  default: "my-dlight-app",
  validate: value => {
    if (value.length === 0) {
      return "Enter a valid project name!"
    }
    if (fs.existsSync(value)) {
      return "Folder already exsits"
    }
    if (!/^[a-z]+([-_][a-z0-9]+)*$/.test(value)) {
      return "Use lowercase letters, no spaces or special characters. Use hyphens or underscores to separate words."
    }
    return true
  }
})

const language = await select({
  message: "🥑 Language support",
  choices: [
    {
      name: "Javascript",
      value: "js"
    },
    {
      name: "Typescript",
      value: "ts"
    }
  ]
})

// Resolve Deps
const selectedDependencies: string[] = await checkbox({
  message: "📦 Packages to be installed",
  choices: [
    {
      name: "@dlightjs/components",
      value: "@dlightjs/components"
    },
    {
      name: "@dlightjs/emotion",
      value: "@dlightjs/emotion"
    }
  ]
})
const selectedDevDependencies = ["vite", "vite-plugin-dlight"]
selectedDependencies.push("@dlightjs/dlight")
if (language === "ts") {
  selectedDependencies.push("@dlightjs/types")
  selectedDevDependencies.push("typescript")
}

const getLatestVersion = async(packageName: string) => {
  const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`)
  const json = await response.json()
  return json.version
}

const selectDep = async(selectFields: string[], fullDic: Record<string, string>) => {
  const selectDep: Record<string, string> = {}
  selectFields.forEach((field) => {
    if (fullDic[field]) {
      selectDep[field] = fullDic[field]
    }
  })

  const promises = Object.entries(selectDep).map(async([key, value]) =>
    await getLatestVersion(key).then((version) => (selectDep[key] = `^${version}`))
  )
  await Promise.all(promises)

  return selectDep
}

const depsPromise = selectDep(selectedDependencies, dependencies)
const devDepsPromise = selectDep(selectedDevDependencies, devDependencies)
const [deps, devDeps] = await Promise.all([depsPromise, devDepsPromise])

// --- Download templates
const templateDir = path.resolve(
  fileURLToPath(import.meta.url),
  "../../templates",
  `dlight-vite-${language}`
)

execSync(`cp -r ${templateDir} ./${projectName}`)

const packagePath = `${projectName}/package.json`
const data = fs.readFileSync(packagePath, { encoding: "utf8", flag: "r" })
fs.writeFileSync(
  packagePath,
  data
    .replace("{{ PROJECT_NAME }}", projectName)
    .replace("{{ DEPENDENCIES }}", jsonify(deps))
    .replace("{{ DEV_DEPENDENCIES }}", jsonify(devDeps)),
  { encoding: "utf8", flag: "w" }
)

const packageManager = await select({
  message: "🍲 Package manager",
  choices: [
    {
      name: "NPM",
      value: "npm"
    },
    {
      name: "PNPM",
      value: "pnpm"
    },
    {
      name: "YARN",
      value: "yarn"
    },
    {
      name: "NONE",
      value: undefined,
      description: "Install by yourself"
    }
  ]
})

if (packageManager) {
  execSync(`${packageManager as string} install`, { cwd: projectName, stdio: "inherit" })
  success(`Successfully installed dependencies using ${packageManager as string}!`)
  let cmd = ""
  if (packageManager === "pnpm") {
    cmd = "pnpm dev"
  } else if (packageManager === "npm") {
    cmd = "npm run dev"
  } else if (packageManager === "yarn") {
    cmd = "yarn dev"
  }
  info(`Run app with \`cd ${projectName} && ${cmd}\`\n`)
}

info("🎉 All done!")
info(logo)
info(":D Happy coding in DLight!")
