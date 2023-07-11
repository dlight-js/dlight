import { writeFileSync, readFileSync } from "fs"

// 指定要设置的新版本号
const packagePath = `${process.argv[2]}/package.json`
const currentPackageVersion = readFileSync(packagePath, "utf8").match(/"version": "(.+?)"/)[1]

// 获取当前版本号
const newVersion = JSON.parse(readFileSync("./package.json", "utf8")).version

// 如果版本号相同，则退出脚本
if (newVersion === currentPackageVersion) {
  console.log(`\x1b[33m${process.argv[2]} version is already ${newVersion}\x1b[0m`)
  process.exit(0)
}

// 更新版本号
writeFileSync(packagePath, readFileSync(packagePath, "utf8").replace(`"version": "${currentPackageVersion}"`, `"version": "${newVersion}"`))

// 打印新版本号
console.log(`\x1b[32m${process.argv[2]} version updated from ${currentPackageVersion} to ${newVersion}\x1b[0m`)
