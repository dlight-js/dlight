if [ -z "$1" ]; then
  # dependencies in order
  # main
  pnpm refresh @dlightjs/dlight
  pnpm refresh @dlightjs/types
  pnpm refresh @dlightjs/emotion
  pnpm refresh @dlightjs/components
  pnpm refresh @dlightjs/material-icons
  pnpm refresh @dlightjs/create-dlightjs

  # transpiler
  pnpm refresh plugin/babel-plugin-dlight
  pnpm refresh plugin/babel-preset-dlight
  pnpm refresh @dlightjs/transpiler
  pnpm refresh @dlightjs/transpiler-standalone
  pnpm refresh plugin/vite-plugin-dlight

else
  pnpm --filter "./packages/${1}" install
  pnpm build ${1}
fi
