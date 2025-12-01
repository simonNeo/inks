# Inks

[English](README.md) | 中文

一个为 [Ink](https://github.com/vadimdemedes/ink) 开发者提供有用工具和组件的 monorepo。

## 📦 项目结构

这是一个使用 [pnpm workspace](https://pnpm.io/workspaces) 和 [Turbo](https://turbo.build/) 构建的 monorepo。

```
inks/
├── packages/              # 发布的 npm 包
│   ├── ink-hooks/        # 用于 Ink 的 React hooks
│   └── ink-scroll-box/   # 用于 Ink 的可滚动容器组件
├── examples/             # 示例项目
│   ├── use-hooks/        # 使用 ink-hooks 的示例
│   └── use-scroll-box/   # 使用 ink-scroll-box 的示例
└── ...
```

## 🚀 快速开始

### 安装

```bash
pnpm install
```

### 开发

运行所有包的开发模式：

```bash
pnpm dev
```

运行示例项目（将自动启动依赖的监听模式）：

```bash
pnpm dev:example
```

### 构建

构建所有包：

```bash
pnpm build
```

### 清理

清理所有构建输出：

```bash
pnpm clean
```

## 📚 包

### [ink-hooks](./packages/ink-hooks)

用于构建 Ink 应用的有用 React hooks 集合。

**特性：**
- 🎯 类型安全 - 使用 TypeScript 构建
- 📦 可摇树优化 - 按需导入
- 🔄 响应式 - 终端尺寸变化时自动更新
- 📐 盒模型支持 - 计算内容、内边距、边框和外边距尺寸
- 🖥️ 全屏支持 - 轻松管理全屏模式

**可用的 Hooks：**
- `useStdoutDimensions` - 获取终端尺寸并监听尺寸变化
- `useMeasure` - 测量 Box 组件尺寸
- `useBoxModel` - 计算 Box 盒模型尺寸
- `useFullScreen` - 管理终端全屏模式

详细文档和使用示例，请参阅 [ink-hooks README](./packages/ink-hooks/README.zh.md)。

### [ink-scroll-box](./packages/ink-scroll-box)

用于 Ink CLI 应用的可滚动容器组件。通过仅显示可见项来高效渲染大型列表，支持逐项滚动和逐页滚动两种模式。

**特性：**
- 🎯 类型安全 - 使用 TypeScript 构建
- 📦 高性能 - 仅渲染可见项以获得最佳性能
- 🔄 双滚动模式 - 支持逐项滚动和逐页滚动
- ⌨️ 键盘导航 - 支持方向键和 'up'/'down' 输入
- 🎨 可定制 - 使用自定义项渲染器灵活渲染
- 📐 盒模型支持 - 支持所有 Ink Box 属性（padding、margin、border 等），在容器拥有 padding/border 时可自适应

详细文档和使用示例，请参阅 [ink-scroll-box README](./packages/ink-scroll-box/README.zh.md)。

## 🛠️ 技术栈

- **包管理器**: [pnpm](https://pnpm.io/)
- **构建系统**: [Turbo](https://turbo.build/)
- **打包工具**: [tsup](https://tsup.egoist.dev/)
- **类型检查**: [TypeScript](https://www.typescriptlang.org/)
- **UI 框架**: [Ink](https://github.com/vadimdemedes/ink)
- **React**: React 19.2.0+

## 📝 开发指南

### 添加新包

1. 在 `packages/` 目录下创建新包
2. 在包的 `package.json` 中配置基本信息
3. 如需要，在根目录的 `turbo.json` 中配置构建任务

### 添加新示例

1. 在 `examples/` 目录下创建新示例
2. 在示例的 `package.json` 中使用 workspace 协议：
   ```json
   {
     "dependencies": {
       "ink-hooks": "workspace:*",
       "ink-scroll-box": "workspace:*"
     }
   }
   ```

### 发布包

1. 进入包目录
2. 确保版本号已更新
3. 运行构建：`pnpm build`
4. 发布到 npm：`pnpm publish`

## 📄 许可证

MIT

## 🔗 链接

- [Ink](https://github.com/vadimdemedes/ink) - 用于 CLI 应用的 React
- [Turbo](https://turbo.build/) - 高性能构建系统
- [pnpm](https://pnpm.io/) - 快速、节省磁盘空间的包管理器

