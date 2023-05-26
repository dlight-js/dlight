if [ -z "$1" ]; then
  pnpm --filter "./packages/**" -r build
else
  pnpm --prefix packages/${1} build
fi
