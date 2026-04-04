# opencode-notify plugin

## Install dependencies

```bash
bun install
```

## Build the distributable bundle

```bash
bun run build
```

## Send a manual test notification

```bash
bun run notify "OpenCode: Test" "This is a test from opencode-notify"
```

The published package exposes the compiled files in `dist/` so the plugin can be loaded without Bun installed, while keeping build artifacts out of version control.
