# ink-hooks

[English](README.md) | 中文

用于使用 [Ink](https://github.com/vadimdemedes/ink) 构建 CLI 应用的实用 React Hooks 集合。

## 特性

- 🎯 **类型安全** - 使用 TypeScript 构建
- 📦 **Tree-shakeable** - 按需导入
- 🔄 **响应式** - 终端尺寸变化时自动更新
- 📐 **盒模型支持** - 计算内容、内边距、边框和外边距尺寸
- 🖥️ **全屏支持** - 轻松管理全屏模式

## 截图

![示例截图](screenshots/hooks.png)

## 安装

```bash
npm install ink-hooks
# 或
pnpm add ink-hooks
# 或
yarn add ink-hooks
```

## 要求

- React 19.2.0 或更高版本
- Ink 6.5.1 或更高版本

## Hooks

### `useStdoutDimensions`

获取当前终端尺寸（列数和行数），并在终端调整大小时自动更新。

```tsx
import { useStdoutDimensions } from 'ink-hooks';

function App() {
  const { columns, rows } = useStdoutDimensions();
  
  return (
    <Text>
      终端尺寸: {columns} x {rows}
    </Text>
  );
}
```

**返回值:**
- `columns: number` - 终端的列数
- `rows: number` - 终端的行数

### `useMeasure`

测量 Box 组件的尺寸。

```tsx
import { Box } from 'ink';
import { useMeasure } from 'ink-hooks';

function App() {
  const { ref, size } = useMeasure({
    borderStyle: 'single',
    padding: 1,
  });
  
  return (
    <Box ref={ref} borderStyle="single" padding={1}>
      <Text>宽度: {size.width}, 高度: {size.height}</Text>
    </Box>
  );
}
```

**返回值:**
- `ref: RefObject<DOMElement>` - 附加到 Box 组件的 ref
- `size: { width: number, height: number }` - 测量到的尺寸

### `useBoxModel`

计算 Box 组件的盒模型尺寸（内容、内边距、边框、外边距）。

```tsx
import { Box } from 'ink';
import { useBoxModel } from 'ink-hooks';

function App() {
  const { ref, content, padding, border, margin } = useBoxModel({
    borderStyle: 'single',
    padding: 1,
    margin: 1,
  });
  
  return (
    <>
      <Box ref={ref} borderStyle="single" padding={1} margin={1}>
        <Text>内容</Text>
      </Box>
      <Text>
        内容: {content.width}x{content.height} | 
        边框: {border.width}x{border.height} | 
        外边距: {margin.width}x{margin.height}
      </Text>
    </>
  );
}
```

**返回值:**
- `ref: RefObject<DOMElement>` - 附加到 Box 组件的 ref
- `content: { width: number, height: number }` - 内容盒尺寸
- `padding: { width: number, height: number }` - 内边距盒尺寸
- `border: { width: number, height: number }` - 边框盒尺寸
- `margin: { width: number, height: number }` - 外边距盒尺寸

### `useFullScreen`

启用终端的全屏模式。组件卸载时自动退出全屏。

```tsx
import { useFullScreen } from 'ink-hooks';

function App() {
  const exitFullScreen = useFullScreen();
  
  // 组件现在处于全屏模式
  // 如果需要，可以手动调用 exitFullScreen()
  
  return <Text>全屏模式已激活</Text>;
}
```

**返回值:**
- `exitFullScreen: () => void` - 手动退出全屏模式的函数

## 示例

查看 [examples 目录](../../examples) 获取更多使用示例。

## 许可证

MIT

