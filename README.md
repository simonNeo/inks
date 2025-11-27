# Inks

A monorepo providing useful tools and components for [Ink](https://github.com/vadimdemedes/ink) developers.

## 📦 Project Structure

This is a monorepo built with [pnpm workspace](https://pnpm.io/workspaces) and [Turbo](https://turbo.build/).

```
inks/
├── packages/          # Published npm packages
│   └── ink-hooks/    # React hooks for Ink
├── examples/         # Example projects
│   └── with-hooks/   # Example using ink-hooks
└── ...
```

## 🚀 Quick Start

### Installation

```bash
pnpm install
```

### Development

Run all packages in development mode:

```bash
pnpm dev
```

Run example project (will automatically start watch mode for dependencies):

```bash
pnpm dev:example
```

### Build

Build all packages:

```bash
pnpm build
```

### Clean

Clean all build outputs:

```bash
pnpm clean
```

## 📚 Packages

### [ink-hooks](./packages/ink-hooks)

A collection of useful React hooks for building Ink applications.

**Features:**
- 🎯 Type-safe - Built with TypeScript
- 📦 Tree-shakeable - Import only what you need
- 🔄 Reactive - Automatically updates when terminal dimensions change
- 📐 Box Model Support - Calculate content, padding, border, and margin dimensions
- 🖥️ Fullscreen Support - Easy fullscreen mode management

**Available Hooks:**
- `useStdoutDimensions` - Get terminal dimensions with resize listener
- `useMeasure` - Measure Box component dimensions
- `useBoxModel` - Calculate Box box model dimensions
- `useFullScreen` - Manage terminal fullscreen mode

For detailed documentation and usage examples, see [ink-hooks README](./packages/ink-hooks/README.md).

## 🎯 Examples

### with-hooks

Example project demonstrating how to use `ink-hooks`.

Run the example:

```bash
cd examples/with-hooks
pnpm dev
```

Or from the root directory:

```bash
pnpm dev:example
```

## 🛠️ Tech Stack

- **Package Manager**: [pnpm](https://pnpm.io/)
- **Build System**: [Turbo](https://turbo.build/)
- **Bundler**: [tsup](https://tsup.egoist.dev/)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)
- **UI Framework**: [Ink](https://github.com/vadimdemedes/ink)
- **React**: React 19.2.0+

## 📝 Development Guide

### Adding a New Package

1. Create a new package in the `packages/` directory
2. Configure basic information in the package's `package.json`
3. Configure build tasks in root `turbo.json` if needed

### Adding a New Example

1. Create a new example in the `examples/` directory
2. Use workspace protocol in the example's `package.json`:
   ```json
   {
     "dependencies": {
       "ink-hooks": "workspace:*"
     }
   }
   ```

### Publishing a Package

1. Navigate to the package directory
2. Ensure the version number is updated
3. Run build: `pnpm build`
4. Publish to npm: `pnpm publish`

## 📄 License

MIT

## 🔗 Links

- [Ink](https://github.com/vadimdemedes/ink) - React for CLI apps
- [Turbo](https://turbo.build/) - High-performance build system
- [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
