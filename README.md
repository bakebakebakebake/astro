# Rapide 主题文档项目

这是一个使用 **Starlight Rapide 主题**构建的文档网站项目。

## 🎨 主题说明

- **当前主题**: Starlight Rapide
- **基于**: Astro + Starlight
- **特点**: 现代化设计、优雅的视觉体验、丰富的组件支持

> **注意**: Rapide 是 Starlight 的一个主题插件，不是独立主题。它在 Starlight 的基础上提供了更优美的视觉样式。

## 📦 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:4321` 查看文档。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📚 项目结构

```
src/
├── content/
│   └── docs/              # 文档内容
│       ├── index.mdx      # 首页
│       └── guides/        # 指南文档
│           ├── getting-started.md        # 入门指南
│           ├── rapide-syntax-guide.mdx   # Rapide 语法完整指南 ⭐
│           ├── rapide-test.mdx           # 主题功能测试
│           └── dirichlet-convolution.md  # 数学示例
├── components/            # 自定义组件
│   └── CustomHeader.astro
├── styles/               # 自定义样式
│   ├── custom.css
│   └── katex.css        # LaTeX 样式
└── content.config.ts    # 内容集合配置

astro.config.mjs         # Astro 配置文件
package.json
```

## 📖 学习资源

### 必读文档

访问 **[Rapide 语法完整指南](/guides/rapide-syntax-guide/)** 学习：

- ✅ **标注（Asides）** - 5种类型的提示框
- ✅ **代码块** - 支持所有主流编程语言
- ✅ **组件** - Badge、Card、Tabs、Steps、FileTree 等
- ✅ **LaTeX 公式** - 数学公式支持
- ✅ **最佳实践** - 文档编写建议

### 官方资源

- [Starlight 官方文档](https://starlight.astro.build/)
- [Rapide 主题官网](https://starlight-theme-rapide.vercel.app/)
- [Astro 文档](https://docs.astro.build/)

## ⚙️ 配置说明

### 主要配置文件

#### `astro.config.mjs`

项目的核心配置文件，包含：
- Starlight 集成配置
- Rapide 主题插件配置
- 代码高亮设置
- 侧边栏导航配置
- LaTeX 数学公式支持

#### `src/content.config.ts`

内容集合配置，定义文档的结构和验证规则。

### 主题特性

当前配置已启用：

- ✅ 代码块语法高亮（支持浅色/深色主题）
- ✅ 自动显示行号
- ✅ LaTeX 数学公式渲染
- ✅ 响应式设计
- ✅ 深色/浅色模式切换
- ✅ 全站搜索功能
- ✅ 自定义 Header 组件

## 💡 使用技巧

### 创建新文档

1. 在 `src/content/docs/` 下创建 `.md` 或 `.mdx` 文件
2. 添加 frontmatter（title、description 等）
3. 如需使用组件，使用 `.mdx` 格式并导入组件
4. 在 `astro.config.mjs` 的 `sidebar` 中添加导航链接

### MDX vs Markdown

- **`.md`** - 普通 Markdown 文档，适合纯文本内容
- **`.mdx`** - 支持 JSX 组件，可以使用 Starlight 的所有组件

### 组件导入

在 `.mdx` 文件中导入组件：

```jsx
---
title: 我的页面
---

import { Card, Badge } from '@astrojs/starlight/components';

# 标题

<Card title="示例">
  内容
</Card>
```

## 🔧 依赖项

主要依赖：

- `astro` - 核心框架
- `@astrojs/starlight` - Starlight 文档主题
- `starlight-theme-rapide` - Rapide 主题插件
- `remark-math` & `rehype-katex` - LaTeX 数学公式支持

## 📝 许可

MIT

---

**开始使用**: 阅读 [Rapide 语法完整指南](/guides/rapide-syntax-guide/) 了解所有功能！ 🚀
