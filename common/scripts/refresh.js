const { execSync } = require("child_process")

if (!process.argv[2]) {
  // dependencies in order
  execSync("pnpm pipeline refresh core", { stdio: "inherit" })
  execSync("pnpm pipeline refresh ecosystem", { stdio: "inherit" })
  execSync("pnpm pipeline refresh easy-css", { stdio: "inherit" })
} else {
  execSync(`pnpm --filter ${process.argv[2]} install`, { stdio: "inherit" })
  execSync(`node ./common/scripts/build.js ${process.argv[2]}`, { stdio: "inherit" })
}
