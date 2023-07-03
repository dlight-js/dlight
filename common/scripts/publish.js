const { execSync } = require("child_process")
execSync(`pnpm --filter ${process.argv[2]} publish --no-git-checks --access=public`, { stdio: "inherit" })
