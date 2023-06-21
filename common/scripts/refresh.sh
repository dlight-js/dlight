if [ -z "$1" ]; then
  # dependencies in order
  pnpm pipeline refresh core
  pnpm pipeline refresh plugin
  pnpm pipeline refresh ecosystem
else
  pnpm --filter ${1} install
  sh ./common/scripts/build.sh ${1}
fi
