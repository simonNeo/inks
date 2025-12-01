# Inks

English | [中文](README.zh.md)

A monorepo providing useful tools and components for [Ink](https://github.com/vadimdemedes/ink) developers.

## 📦 Project Structure

This is a monorepo built with [pnpm workspace](https://pnpm.io/workspaces) and [Turbo](https://turbo.build/).

```
inks/
├── packages/              # Published npm packages
│   ├── ink-hooks/        # React hooks for Ink
│   └── ink-scroll-box/   # Scrollable container component for Ink
├── examples/             # Example projects
│   ├── use-hooks/        # Example using ink-hooks
│   └── use-scroll-box/   # Example using ink-scroll-box
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

### [ink-scroll-box](./packages/ink-scroll-box)

A scrollable container component for Ink CLI applications. Efficiently renders large lists by only displaying visible items, with support for both item-by-item and page-by-page scrolling modes.

**Features:**
- 🎯 Type-safe - Built with TypeScript
- 📦 Performant - Only renders visible items for optimal performance
- 🔄 Dual Scroll Modes - Support for item-by-item and page-by-page scrolling
- ⌨️ Keyboard Navigation - Arrow keys and 'up'/'down' input support
- 🎨 Customizable - Flexible rendering with custom item renderers
- 📐 Box Model Support - Supports all Ink Box props (padding, margin, border, etc.) with automatic adaptation when container has padding/border

For detailed documentation and usage examples, see [ink-scroll-box README](./packages/ink-scroll-box/README.md).

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
       "ink-hooks": "workspace:*",
       "ink-scroll-box": "workspace:*"
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
