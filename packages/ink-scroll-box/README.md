# ink-scroll-box

English | [中文](README.zh.md)

A scrollable container component for Ink CLI applications. Efficiently renders large lists by only displaying visible items, with support for both item-by-item and page-by-page scrolling modes.



## Features

- 🎯 **Type-safe** - Built with TypeScript
- 📦 **Performant** - Only renders visible items for optimal performance
- 🔄 **Dual Scroll Modes** - Support for item-by-item and page-by-page scrolling
- ⌨️ **Keyboard Navigation** - Arrow keys and 'up'/'down' input support
- 🎨 **Customizable** - Flexible rendering with custom item renderers
- 📐 **Box Model Support** - Supports all Ink Box props (padding, margin, border, etc.) with automatic adaptation when container has padding/border

## Screenshot

![Example screenshot](screenshots/single-scroll.png)

## Installation

```bash
npm install ink-scroll-box
# or
pnpm add ink-scroll-box
# or
yarn add ink-scroll-box
```

## Requirements

- React 19.2.0 or higher
- Ink 6.5.1 or higher
- ink-hooks (peer dependency)

## Usage

### Basic Example

```tsx
import { Box, Text } from 'ink';
import { ScrollBox } from 'ink-scroll-box';
import type { ScrollBoxState } from 'ink-scroll-box';
import { useState } from 'react';

const largeList = Array.from({ length: 1000 }, (_, index) => `Item ${index}`);

function App() {
  const [currentState, setCurrentState] = useState<ScrollBoxState<string> | null>(null);
  const [changeResult, setChangeResult] = useState<ScrollBoxState<string> | null>(null);

  return (
    <Box flexDirection="column">
      <Text>Current: {JSON.stringify(currentState)}</Text>
      <Text>Change: {changeResult?.index}</Text>
      <ScrollBox
        enableScroll
        height={10}
        padding={1}
        margin={1}
        borderStyle="single"
        list={largeList}
        onSelect={setCurrentState}
        onChange={setChangeResult}
        renderItem={(item, isActive) => {
          return (
            <Text color={isActive ? 'green' : undefined}>
              {isActive ? '>' : ' '} {item}
            </Text>
          );
        }}
      />
    </Box>
  );
}
```

### Page Scroll Mode

```tsx
<ScrollBox
  enableScroll
  scrollMode="page"
  height={10}
  list={items}
  renderItem={(item, isActive) => <Text>{item}</Text>}
/>
```

> **⚠️ Important**
> 
> - To prevent focus conflicts between multiple scrollable containers, you must manually set `enableScroll` to enable arrow key scrolling.
> - Currently, only single-item rendering per row is supported.

## API

### `ScrollBox<T>`

A scrollable container component that efficiently renders large lists.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `list` | `T[]` | ✅ | - | Original data items to display |
| `renderItem` | `(item: T, isActive: boolean) => React.ReactNode` | ✅ | - | Render function for each item. *Must* render a single row. `isActive` indicates whether the current item is selected, and is always `false` when `scrollMode='page'` |
| `enableScroll` | `boolean` | ✅ | - | Whether scrolling is enabled. When `true`, arrow keys will be listened to |
| `scrollMode` | `'item' \| 'page'` | ❌ | `'item'` | Scroll mode: `'item'` for item-by-item scrolling, `'page'` for page-by-page scrolling |
| `onChange` | `(result: ScrollBoxState<T>) => void` | ❌ | - | Callback function called when scrolling is triggered |
| `onSelect` | `(result: ScrollBoxState<T>) => void` | ❌ | - | The only difference from onChange is that this function will be called once during initialization |


#### Scroll Modes

**`'item'` (default)**
- Scrolls one item at a time using arrow keys
- Maintains a selected/active item (highlighted)
- `isActive` parameter in `renderItem` indicates the selected item
- `onSelect` callback is triggered when selection changes

**`'page'`**
- Scrolls by page (one visible page at a time)
- No item selection/highlighting
- `isActive` is always `false` in `renderItem`
- Useful for browsing large lists without selection

### `ScrollBoxState<T>`

The state object passed to `onChange` and `onSelect` callbacks.

```typescript
interface ScrollBoxState<T> {
  item?: T;           // Current selected item (only in 'item' mode, undefined in 'page' mode)
  index: number;      // Current selected index (in 'item' mode) or first visible index (in 'page' mode)
  startIndex: number; // Starting index of the visible range
  endIndex: number;   // Ending index of the visible range (exclusive)
}
```

## Keyboard Controls

When `enableScroll` is `true`, the component listens to:
- `↑` / `up` - Scroll up
- `↓` / `down` - Scroll down

## Examples

Check out the [examples directory](../../examples) for more usage examples.

## License

MIT

