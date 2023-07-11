import { execSync } from "child_process"

execSync(`pnpm --filter ${process.argv[2]} build`, { stdio: "inherit" })
