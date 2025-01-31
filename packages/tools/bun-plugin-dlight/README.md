# bun-plugin-dlight

🚀 **Bun plugin for DLight transpilation**

`bun-plugin-dlight` is a **Bun.build plugin** that enables seamless transpilation of DLight views and models in your Bun-powered web app. It allows you to compile `.view.js` and `.view.ts` files effortlessly, integrating DLight components into your project without extra configuration.

## Features

- 🏗 **Automatic DLight transpilation** – No need for manual builds.
- ⚡ **Optimized for Bun.build** – Works directly with Bun's lightning-fast bundler.
- 🔧 **Supports JavaScript & TypeScript** – Transpile `.view.js` and `.view.ts` files.
- 📦 **Lightweight & fast** – Minimal overhead, maximum performance.
- 🛠 **Easy integration** – Just plug it into your Bun project.

## Wait, What is DLight?

DLight is a DX-first reactive UI rendering library for the web. See https://dlight.dev

## Installation

Install the package using Bun:

```sh
bun add bun-plugin-dlight
```

## Usage

Integrate `bun-plugin-dlight` in your Bun build process:

```ts
import { dlightPlugin } from "bun-plugin-dlight";

const result = await Bun.build({
    outdir: "./dist",
    entrypoints: ["./src/index.ts"],
    publicPath: "/build/",
    throw: true,
    plugins: [
      dlightPlugin(),
      // Add other plugins here, e.g., tailwindPlugin()
    ],
});
```

### Configuration

The plugin works out of the box, but you can pass options for custom behavior:

```ts
dlightPlugin({
    filter: /\.(view|model)\.[tj]s$/, // Customize file matching pattern
    options: {}, // DLight preset options
});
```

## How It Works

1. Detects and processes `.view.js` and `.view.ts` files.
2. Transpiles them using the DLight framework, via Babel.
3. Integrates seamlessly with Bun.build, ensuring efficient builds.

## Why Use This Plugin?

- Simplifies DLight integration with Bun.
- For some projects, external dependencies like vite or astro might not be needed.
- Provides a smooth developer experience with Bun’s modern tooling.

## Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

## License

MIT License © Duane Johnson
