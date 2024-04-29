# Use quickjs-emscripten to send HTTP(s) requests from inside WASM

## Instructions for this devcontainer

Tested with Node 20.11.1, Bun 1.1.7, Deno 1.43.1, quickjs-emscripten [v0.29.1](https://github.com/justjake/quickjs-emscripten/blob/v0.29.1).

### Preparation

1. Open this repo in devcontainer, e.g. using Github Codespaces.
   Type or copy/paste following commands to devcontainer's terminal.

### Installation

1. `cd` into the folder of this example:

```sh
cd browser-and-node
```

2. Install quickjs-emscripten:

```sh
yarn add quickjs-emscripten
```

### Test with browser

1. Run simple HTTP server to temporarily publish project to Web:

```sh
python3 -m http.server
```

Codespace will show you "Open in Browser" button. Just click that button or
obtain web address from "Forwarded Ports" tab.

2. As `index.html` and a wasm file are loaded into browser, refer to browser developer console
   to see the results.

### Test with Node.js

1. Run with Node:

```sh
node httpget.mjs
```

### Test with Bun

1. Install Bun:

```sh
curl -fsSL https://bun.sh/install | bash
```

2. Run with Bun:

```sh
~/.bun/bin/bun httpget.mjs
```

### Test with Deno

1. Install Deno:

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

2. Run with Deno:

```sh
~/.deno/bin/deno run --allow-read --allow-net httpget.mjs
```

### Finish

Perform your own experiments if desired.
