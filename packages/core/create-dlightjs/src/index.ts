#!/usr/bin/env node
import { input, select, checkbox } from "@inquirer/prompts"
import { execSync } from "child_process"
import { info, jsonify, logo, success } from "./utils"
import { fileURLToPath } from "node:url"
import fetch from "node-fetch"
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

const isBlank = await select({
  message: "📃 blank template",
  choices: [
    {
      name: "yes",
      value: true
    },
    {
      name: "no",
      value: false
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
      name: "@dlightjs/material-icons",
      value: "@dlightjs/material-icons"
    },
    {
      name: "@dlightjs/markit",
      value: "@dlightjs/markit"
    },
    {
      name: "@iandx/easy-css",
      value: "@iandx/easy-css"
    }
  ]
})
const selectedDevDependencies = ["vite", "vite-plugin-dlight"]
selectedDependencies.push("@dlightjs/dlight")
if (language === "ts") {
  selectedDependencies.push("@dlightjs/types")
  selectedDevDependencies.push("typescript")
}

const getLatestVersion = async(key: string) => {
  return await fetch(`https://registry.npmjs.org/${key}`)
    .then(async res => await res.json())
    .then((data: any) => data["dist-tags"].latest)
}
const selectDep = async(selectFields: string[], type: string) => {
  const selectedDeps: Record<string, string> = {}

  if (type === "dep") {
    await Promise.all(selectFields.map(async key => {
      const version = await getLatestVersion(key)
      selectedDeps[key] = `^${version}`
    }))
  } else if (type === "dev") {
    const version = await getLatestVersion("vite-plugin-dlight")
    selectedDeps["vite-plugin-dlight"] = `^${version}`
  }
  return selectedDeps
}

const [deps, devDeps] = await Promise.all([
  selectDep(selectedDependencies, "dep"),
  selectDep(selectedDevDependencies, "dev")
])

// --- Download templates
const templateDir = path.resolve(
  fileURLToPath(import.meta.url),
  "../../templates",
  `dlight-vite-${isBlank ? "min-" : ""}${language}`
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
