#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

program
    .argument('<appName>', 'app name')

program.parse();
const options = program.opts();
const appName = program.args[0]

const execSync = require('child_process').execSync;
try {
    console.log("Hello!")
    execSync("rm -rf dlight-vite-template")
    execSync("git clone https://gitlab.com/iandxssxx/dlight-vite-template.git", { encoding: 'utf-8' })
    console.log('\033[0;32mSucceed to clone template\033[0m');
    execSync(`rm -rf ${appName}`)
    execSync(`mv dlight-vite-template ${appName}`)

    const fs = require('fs')
    const packagePath = `./${appName}/package.json`
    const data = fs.readFileSync(packagePath, {encoding:'utf8', flag:'r'})
    fs.writeFileSync(packagePath, data.replace("_$NAME$_", appName), {encoding:'utf8', flag:'w'})

    console.log('\033[0;32mAll done! Go go go\033[0m');
} catch {
    console.log('\033[0;31mFail to clone template, please check your network\033[0m');
}
