---
title: 开始使用
description: 学习如何开始使用这个Starlight网站
---

# 开始使用

欢迎来到这个Starlight文档网站！本指南将帮助您快速开始。

## 前提条件

- [Node.js](https://nodejs.org/) (v18.14.1 或更高版本)
- 文本编辑器（推荐 [VS Code](https://code.visualstudio.com/)）
- 终端

## 开发步骤

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 访问本地开发服务器：[http://localhost:4321](http://localhost:4321)

## 项目结构

```
/
├── public/          # 静态资源
├── src/
│   ├── assets/      # 图片和其他资源
│   ├── components/  # Astro组件
│   ├── content/     # 文档内容
│   │   └── docs/    # 文档页面
│   └── styles/      # CSS样式文件
└── astro.config.mjs # Astro配置
```

## 后续步骤

开始编写您的文档内容，添加更多页面，并自定义您的Starlight主题！



