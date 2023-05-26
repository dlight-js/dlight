#!/usr/bin/env node
import { input, select, checkbox } from "@inquirer/prompts"
import { execSync } from "child_process"
import { dependencies, devDependencies } from "./dependency"
import { fail, info, jsonify, logo, randomId, success } from "./utils"
import fs from "fs"

// ---- Get project info
const projectName = await input({
  message: "💻 Your project name",
  validate: value => {
    if (value.length === 0) {
      return "Enter a valid project name!"
    }
    if (fs.existsSync(value)) {
      return "Folder already exsits"
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
      name: "@dlightjs/decorators",
      value: "@dlightjs/decorators"
    },
    {
      name: "@dlightjs/emotion",
      value: "@dlightjs/emotion"
    }
  ]
})
const selectedDevDependencies = ["vite", "vite-plugin-dlight-transpiler"]
selectedDependencies.push("@dlightjs/dlight")
if (language === "ts") {
  selectedDependencies.push("@dlightjs/types")
  selectedDevDependencies.push("typescript")
}

const selectDep = (selectFields: string[], fullDic: Record<string, string>) => (
  Object.fromEntries(Object.entries(fullDic).filter(([key]) => selectFields.includes(key)))
)
const deps = selectDep(selectedDependencies, dependencies)
const devDeps = selectDep(selectedDevDependencies, devDependencies)

// --- Download templates
try {
  console.log("Downloading template from github...")
  execSync(`git clone --quiet https://github.com/dlight-js/dlight-vite-template ${projectName}`, { encoding: "utf-8" })
  success("Successfully downloaded the DLight.js template!")
} catch {
  fail("Fail to download template, please check your network")
  process.exit(0)
}
const tempName = `${projectName}-${randomId()}`
execSync(`mv ${projectName} ${tempName}`)
execSync(`rm -rf ${projectName}`)
execSync(`mv ${tempName}/dlight-vite-${language} ${projectName}`)
execSync(`rm -rf ${tempName}`)

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
}
info("🎉 All done!")
info(logo)
info(":D Happy coding in DLight!")
