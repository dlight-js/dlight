if [ -z "$1" ]; then
  # dependencies in order
  pnpm refresh @dlightjs/dlight
  pnpm refresh @dlightjs/transpiler
  pnpm refresh plugin/babel-plugin-optional-this
  pnpm refresh plugin/vite-plugin-dlight-transpiler
  pnpm refresh @dlightjs/types
  pnpm refresh @dlightjs/emotion
  pnpm refresh @dlightjs/components
else
  pnpm --filter "./packages/${1}" install
  pnpm build ${1}
fi
