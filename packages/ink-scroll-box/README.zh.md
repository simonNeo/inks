# ink-scroll-box

[English](README.md) | 中文

用于 Ink CLI 应用的可滚动容器组件。通过仅显示可见项来高效渲染大型列表，支持逐项滚动和逐页滚动两种模式。

## 特性

- 🎯 **类型安全** - 使用 TypeScript 构建
- 📦 **高性能** - 仅渲染可见项以获得最佳性能
- 🔄 **双滚动模式** - 支持逐项滚动和逐页滚动
- ⌨️ **键盘导航** - 支持方向键和 'up'/'down' 输入
- 🎨 **可定制** - 使用自定义项渲染器灵活渲染
- 📐 **盒模型支持** - 支持所有 Ink Box 属性（padding、margin、border 等），在容器拥有 padding/border 时可自适应

## 截图

![示例截图](screenshots/single-scroll.png)

## 安装

```bash
npm install ink-scroll-box
# 或
pnpm add ink-scroll-box
# 或
yarn add ink-scroll-box
```

## 要求

- React 19.2.0 或更高版本
- Ink 6.5.1 或更高版本
- ink-hooks (peer dependency)

## 使用

### 基础示例

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
      <Text>当前: {JSON.stringify(currentState)}</Text>
      <Text>变更: {changeResult?.index}</Text>
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

### 页面滚动模式

```tsx
<ScrollBox
  enableScroll
  scrollMode="page"
  height={10}
  list={items}
  renderItem={(item, isActive) => <Text>{item}</Text>}
/>
```

> **⚠️ 重要提示**
> 
> - 为了防止多个可滚动容器焦点冲突，您必须手动设置 `enableScroll` 才能使用上下键滚动。
> - 目前，只支持单个项目渲染成一行。

## API

### `ScrollBox<T>`

一个高效渲染大型列表的可滚动容器组件。

#### Props

| 属性 | 类型 | 必需 | 默认值 | 描述 |
|------|------|------|--------|------|
| `list` | `T[]` | ✅ | - | 要显示的数据项数组 |
| `renderItem` | `(item: T, isActive: boolean) => React.ReactNode` | ✅ | - | 每个项的渲染函数。必须渲染单行。`isActive` 为当前项是否被选中，`scrollMode=page`时始终为 `false` |
| `enableScroll` | `boolean` | ✅ | - | 是否启用滚动。当为 `true` 时，将监听方向键 |
| `scrollMode` | `'item' \| 'page'` | ❌ | `'item'` | 滚动模式：`'item'` 为逐项滚动，`'page'` 为逐页滚动 |
| `onChange` | `(result: ScrollBoxState<T>) => void` | ❌ | - | 触发滚动时的回调函数 |
| `onSelect` | `(result: ScrollBoxState<T>) => void` | ❌ | - | 和onChange的唯一不同是，该函数会在初始化时调用一次 |

#### 滚动模式

**`'item'` (默认)**
- 使用方向键逐项滚动
- 维护一个选中/激活的项（高亮显示）
- `renderItem` 中的 `isActive` 参数表示选中的项
- 选择变化时触发 `onSelect` 回调

**`'page'`**
- 按页滚动（一次滚动一页可见项）
- 无项选择/高亮
- `renderItem` 中的 `isActive` 始终为 `false`
- 适用于浏览大型列表而无需选择

### `ScrollBoxState<T>`

传递给 `onChange` 和 `onSelect` 回调的状态对象。

```typescript
interface ScrollBoxState<T> {
  item?: T;           // 当前选中的项（仅在 'item' 模式下，'page' 模式下为 undefined）
  index: number;      // 当前选中的索引（'item' 模式下）或第一个可见索引（'page' 模式下）
  startIndex: number; // 可见范围的起始索引
  endIndex: number;   // 可见范围的结束索引（不包含）
}
```

## 键盘控制

当 `enableScroll` 为 `true` 时，组件监听：
- `↑` / `up` - 向上滚动
- `↓` / `down` - 向下滚动

## 示例

查看 [examples 目录](../../examples) 获取更多使用示例。

## 许可证

MIT

